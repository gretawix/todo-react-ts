import Todo from './Todo';
import NewTodo from './NewTodo';
import useTodos from '../context/useTodos';

const Todos = () => {
  const { allTodos, createTodo, handleIsDone, deleteTodo, editTodo } =
    useTodos();

  return (
    <>
      <NewTodo onSubmit={createTodo} />
      <ul>
        {allTodos.map((todo) => {
          return (
            <Todo
              todo={todo}
              key={todo.id}
              onDelete={deleteTodo}
              onToggle={handleIsDone}
              onEdit={editTodo}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Todos;
