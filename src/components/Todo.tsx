import { memo, useState } from 'react';
import type { TodoType } from '../types/main';

type TodoProps = {
  todo: TodoType;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
};

function Todo({ todo, onDelete, onToggle, onEdit }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewText(e.target.value);

  const handleSave = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    setIsEditing(false);
    onEdit(id, newText);
  };

  const hadleEditClick = () => setIsEditing(true);

  const handleCancel = () => setIsEditing(false);

  return (
    <li style={{ textAlign: 'left', listStyle: 'none' }}>
      {isEditing ? (
        <>
          <form onSubmit={(e) => handleSave(e, todo.id)}>
            <label htmlFor={todo.id.toString()}></label>
            <input
              type="text"
              id={todo.id.toString()}
              name={todo.text}
              value={newText}
              onChange={handleTextChange}
            />
            <button type="submit">save</button>
          </form>
          <button type="button" onClick={handleCancel}>
            cancel
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            id={todo.id.toString()}
            name={todo.text}
            checked={todo.isDone}
            onChange={() => onToggle(todo.id)}
          />
          <label htmlFor={todo.id.toString()}>{todo.text}</label>

          <button type="button" onClick={hadleEditClick}>
            edit
          </button>
          <button type="button" onClick={() => onDelete(todo.id)}>
            delete
          </button>
        </>
      )}
    </li>
  );
}

export default memo(Todo);
