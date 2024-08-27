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

  const createTodo = useCallback(
    (todoName: string) => {
      const newTodo: TodoType = {
        id: new Date().getTime(),
        text: todoName,
        isDone: false,
      };

      setAllTodos([...allTodos, newTodo]);
      saveTodos([...allTodos, newTodo], dataSourceType);
    },
    [allTodos]
  );

  const markAsDone = useCallback(
    (id: number) => {
      const updatedTodos = [...allTodos].map((item) => {
        if (item.id === id) {
          return { ...item, isDone: !item.isDone };
        }
        return item;
      });

      setAllTodos(updatedTodos);
      saveTodos(updatedTodos, dataSourceType);
    },
    [allTodos]
  );

  const deleteTodo = useCallback(
    (id: number) => {
      const updatedTodos = [...allTodos].filter((item) => item.id !== id);

      setAllTodos(updatedTodos);
      saveTodos(updatedTodos, dataSourceType);
    },
    [allTodos]
  );

  const editTodo = useCallback(
    (id: number, newText: string) => {
      const updatedTodos = [...allTodos].map((item) => {
        if (item.id === id) {
          return { ...item, text: newText };
        }
        return item;
      });

      setAllTodos(updatedTodos);
      saveTodos(updatedTodos, dataSourceType);
    },
    [allTodos]
  );

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
