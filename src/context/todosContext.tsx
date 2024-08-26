import { createContext } from 'react';
import initialTodos from './initialTodos';

import type { TodosContextType } from '../types/main';

const defaultValue: TodosContextType = {
  allTodos: initialTodos,
  setAllTodos: () => {},
};

const TodosContext = createContext(defaultValue);

export default TodosContext;
