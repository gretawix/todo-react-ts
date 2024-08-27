export type TodoType = {
  id: number;
  text: string;
  isDone: boolean;
};

export type TodosContextType = {
  allTodos: TodoType[];
  createTodo: (todoName: string) => void;
  markAsDone: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
};

export type TodoSourceType = 'local-storage' | 'server';
