import { useState } from 'react';
import TodosContext from './todosContext';
import type { ReactNode } from 'react';
import initialTodos from './initialTodos';

const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [allTodos, setAllTodos] = useState(initialTodos);

  const value = { allTodos, setAllTodos };
  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export default TodosProvider;
