export type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

export type TodosContext = {
  allTodos: Todo[];
  createTodo: (todoName: string) => void;
  markAsDone: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
};

export type TodoDataSource = 'local-storage' | 'server';

export interface TodosService {
  getAll(): Promise<Todo[]>;
  saveTodos(todos: Todo[]): Promise<void>;
}
