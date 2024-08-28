import Todo from './Todo';
import { useTodos } from '../contexts/todos';

const TodosList = () => {
  const { allTodos, markAsDone, deleteTodo, editTodo } = useTodos();

  return (
    <>
      {allTodos.length > 0 ? (
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
      ) : (
        <p>add a todo item </p>
      )}
    </>
  );
};

export default TodosList;
