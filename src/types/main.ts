export type TodoType = {
  id: number;
  text: string;
  isDone: boolean;
};

export type TodosContextType = {
  allTodos: TodoType[];
  setAllTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};
