import { memo, useCallback, useState } from 'react';

type NewTodoProps = {
    onSubmit: (todoText: string) => void;
};

const NewTodo = ({ onSubmit }: NewTodoProps) => {
    const [value, setValue] = useState('');

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="todo">New todo</label>
            <input type="text" id="todo" onChange={handleInputChange} value={value}></input>
            <button type="submit">Add new task</button>
        </form>
    );
};

export default memo(NewTodo);
