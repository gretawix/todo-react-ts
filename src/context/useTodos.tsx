/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext } from 'react';
import TodosContext from './todosContext';

const useTodos = () => {
  const { allTodos, setAllTodos } = useContext(TodosContext);

  const createTodo = useCallback((todoName: string) => {
    setAllTodos((previousValue) => [
      ...previousValue,
      {
        id: new Date().getTime(),
        text: todoName,
        isDone: false,
      },
    ]);
  }, []);

  const handleIsDone = useCallback((id: number) => {
    setAllTodos((previousValue) =>
      previousValue.map((item) => {
        if (item.id === id) {
          return { ...item, isDone: !item.isDone };
        }
        return item;
      })
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setAllTodos((previousValue) =>
      previousValue.filter((item) => item.id !== id)
    );
  }, []);

  const editTodo = useCallback((id: number, newText: string) => {
    setAllTodos((previousValue) =>
      previousValue.map((item) => {
        if (item.id === id) {
          return { ...item, text: newText };
        }
        return item;
      })
    );
  }, []);

  return { allTodos, createTodo, handleIsDone, deleteTodo, editTodo };
};

export default useTodos;
