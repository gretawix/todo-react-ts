import type { TodoDataSource, Todo, TodosService } from '../types/main';

const todosLocalStorageKey = 'todos';
const initialTodos: Todo[] = [
  {
    id: 0,
    text: 'initial todo',
    isDone: false,
  },
];

class TodosLocalStorageService implements TodosService {
  async getAll(): Promise<Todo[]> {
    const localData = localStorage.getItem(todosLocalStorageKey);
    if (localData) {
      return JSON.parse(localData) as Todo[];
    } else {
      return initialTodos;
    }
  }

  async saveTodos(todos: Todo[]): Promise<void> {
    localStorage.setItem(todosLocalStorageKey, JSON.stringify(todos));
  }
}

class TodosServerService implements TodosService {
  async getAll(): Promise<Todo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(initialTodos);
      }, 1000);
    });
  }

  async saveTodos(todos: Todo[]): Promise<void> {
    console.log('saved', todos);
  }
}

const todosServiceFactory = (source: TodoDataSource): TodosService => {
  if (source === 'local-storage') {
    return new TodosLocalStorageService();
  } else if (source === 'server') {
    return new TodosServerService();
  } else {
    throw new Error(`Unsupported source: ${source}`);
  }
};

export default todosServiceFactory;
