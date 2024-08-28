import { memo } from 'react';
import { useTodos } from '../contexts/todos';

const NewTodo = () => {
  const { createTodo } = useTodos();
  const todoName = 'new-todo';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const newTodo = form.get(todoName)?.toString();
    if (newTodo) {
      createTodo(newTodo);
    } else {
      alert('Todo text must not be empty');
    }
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo">New todo</label>
      <input type="text" id={todoName} name={todoName}></input>
      <button type="submit">Add new task</button>
    </form>
  );
};

export default memo(NewTodo);
