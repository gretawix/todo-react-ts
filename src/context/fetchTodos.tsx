import type { TodoSourceType, TodoType } from '../types/main';

const todosKey = 'todos';
const initialTodos: TodoType[] = [
  {
    id: 0,
    text: 'Your first localStorage todo',
    isDone: false,
  },
  {
    id: 1,
    text: 'Your first Server todo',
    isDone: false,
  },
];

const fetchFromServer = async (): Promise<TodoType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([initialTodos[1]]);
    }, 1000);
  });
};

const fetchFromLocalStorage = () => {
  const localData = localStorage.getItem(todosKey);
  if (localData) {
    return JSON.parse(localData) as TodoType[];
  } else {
    return [initialTodos[0]];
  }
};

const fetchTodos = async (source: TodoSourceType): Promise<TodoType[]> => {
  if (source === 'local-storage') {
    return fetchFromLocalStorage();
  } else if (source === 'server') {
    return await fetchFromServer();
  } else {
    throw new Error(`Unknown data source: ${source}`);
  }
};

const saveToLocalStorage = (todos: TodoType[]) => {
  localStorage.setItem(todosKey, JSON.stringify(todos));
};

const saveToServer = (todos: TodoType[]) => {
  console.log('saved', todos);
};

const saveTodos = async (todos: TodoType[], source: TodoSourceType) => {
  if (source === 'local-storage') {
    saveToLocalStorage(todos);
  } else if (source === 'server') {
    saveToServer(todos);
  }
};

export { fetchTodos, saveTodos };
