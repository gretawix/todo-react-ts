import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchTodos, saveTodos } from './fetchTodos';

import type { TodosContextType, TodoSourceType, TodoType } from '../types/main';
import type { ReactNode } from 'react';

const dataSourceType: TodoSourceType = 'local-storage';
const TodosContext = createContext<TodosContextType | undefined>(undefined);

const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [allTodos, setAllTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const initializeTodos = async () => {
      try {
        const initialTodos = await fetchTodos(dataSourceType);
        setAllTodos(initialTodos);
      } catch (error) {
        console.error('Failed to initialize todos:', error);
      }
    };

    initializeTodos();
  }, []);

  const createTodo = useCallback((todoName: string) => {
    setAllTodos((prevTodos) => {
      const newTodo: TodoType = {
        id: new Date().getTime(),
        text: todoName,
        isDone: false,
      };
      const updatedTodos = [...prevTodos, newTodo];
      saveTodos(updatedTodos, dataSourceType);
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
      saveTodos(updatedTodos, dataSourceType);
      return updatedTodos;
    });
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setAllTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((item) => item.id !== id);
      saveTodos(updatedTodos, dataSourceType);
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
      saveTodos(updatedTodos, dataSourceType);
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
