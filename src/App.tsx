import NewTodo from './components/NewTodo';
import TodosList from './components/TodosList';
import { TodosProvider } from './contexts/todos';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

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
}

export default App;
