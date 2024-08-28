import { createContext, useCallback, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { todosServiceFactory } from './todosFactory';

import type { TodosContext, TodoDataSource, Todo } from '../types/main';
import type { ReactNode } from 'react';
import { queryClient } from '../queryClient';

const dataSourceType: TodoDataSource = 'local-storage';
const TodosContext = createContext<TodosContext | undefined>(undefined);
const todosService = todosServiceFactory(dataSourceType);
const todoQueryKey = 'todos';

const updateTodos = (updateFn: (prevTodos: Todo[]) => Todo[]) => {
  queryClient.setQueryData([todoQueryKey], (prevTodos: Todo[] = []) => {
    const updatedTodos = updateFn(prevTodos);
    todosService.saveTodos(updatedTodos);
    return updatedTodos;
  });
};

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const { data: todos, isLoading } = useQuery({
    queryKey: [todoQueryKey],
    queryFn: () => todosService.getAll(),
  });

  const createTodo = useCallback((todoName: string) => {
    updateTodos((prevTodos) => [
      ...prevTodos,
      {
        id: new Date().getTime(),
        text: todoName,
        isDone: false,
      },
    ]);
  }, []);

  const markAsDone = useCallback((id: number) => {
    updateTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    updateTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  }, []);

  const editTodo = useCallback((id: number, newText: string) => {
    updateTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  }, []);

  const allTodos = todos ?? [];

  const value = { allTodos, createTodo, markAsDone, deleteTodo, editTodo };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodos = () => {
  const context = useContext(TodosContext);
  if (context === undefined) {
    throw new Error('useTodos function must be used within a TodosProvider');
  }
  return context;
};
