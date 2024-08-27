import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import todosServiceFactory from './todosFactory';

import type { TodosContext, TodoDataSource, Todo } from '../types/main';
import type { ReactNode } from 'react';

const dataSourceType: TodoDataSource = 'local-storage';
const TodosContext = createContext<TodosContext | undefined>(undefined);
const todosService = todosServiceFactory(dataSourceType);

const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const { data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: todosService.getAll,
  });

  useEffect(() => {
    setAllTodos(todos ?? []);
  }, [todos]);

  const createTodo = useCallback((todoName: string) => {
    setAllTodos((prevTodos) => {
      const newTodo: Todo = {
        id: new Date().getTime(),
        text: todoName,
        isDone: false,
      };
      const updatedTodos = [...prevTodos, newTodo];
      todosService.saveTodos(updatedTodos);
      return updatedTodos;
    });
  }, []);

  const markAsDone = useCallback((id: number) => {
    setAllTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((item) => {
        if (item.id === id) {
          return { ...item, isDone: !item.isDone };
        }
        return item;
      });
      todosService.saveTodos(updatedTodos);
      return updatedTodos;
    });
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setAllTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((item) => item.id !== id);
      todosService.saveTodos(updatedTodos);
      return updatedTodos;
    });
  }, []);

  const editTodo = useCallback((id: number, newText: string) => {
    setAllTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((item) => {
        if (item.id === id) {
          return { ...item, text: newText };
        }
        return item;
      });
      todosService.saveTodos(updatedTodos);
      return updatedTodos;
    });
  }, []);

  const value = { allTodos, createTodo, markAsDone, deleteTodo, editTodo };
  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

const useTodos = () => {
  const context = useContext(TodosContext);
  if (context === undefined) {
    throw new Error('useTodos function must be used within a TodosProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { TodosProvider, useTodos };
