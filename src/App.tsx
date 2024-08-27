import NewTodo from './components/NewTodo';
import TodosList from './components/TodosList';
import { TodosProvider } from './context/todos';

function App() {
  return (
    <div className="App">
      <h1>Todo app</h1>
      <TodosProvider>
        <NewTodo />
        <TodosList />
      </TodosProvider>
    </div>
  );
}

export default App;
