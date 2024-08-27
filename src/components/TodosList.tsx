import Todo from './Todo';
import { useTodos } from '../context/todos';

const TodosList = () => {
  const { allTodos, markAsDone, deleteTodo, editTodo } = useTodos();

  return (
    <ul>
      {allTodos.map((todo) => {
        return (
          <Todo
            todo={todo}
            key={todo.id}
            onDelete={deleteTodo}
            onToggle={markAsDone}
            onEdit={editTodo}
          />
        );
      })}
    </ul>
  );
};

export default TodosList;
