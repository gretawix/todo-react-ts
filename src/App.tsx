import NewTodo from './components/NewTodo';
import TodosList from './components/TodosList';
import { TodosProvider } from './contexts/todos';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';

const App = () => {
  return (
    <div className="App">
      <h1>Todo app</h1>
      <QueryClientProvider client={queryClient}>
        <TodosProvider>
          <NewTodo />
          <TodosList />
        </TodosProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
