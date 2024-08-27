import { memo } from 'react';
import { useTodos } from '../context/todos';

const NewTodo = () => {
  const { createTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newTodo = form.get('new-todo')?.toString();
    createTodo(newTodo ?? '');
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo">New todo</label>
      <input type="text" id="new-todo" name="new-todo"></input>
      <button type="submit">Add new task</button>
    </form>
  );
};

export default memo(NewTodo);
