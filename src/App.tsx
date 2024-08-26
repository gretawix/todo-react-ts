import Todos from './components/Todos';
import TodosProvider from './context/TodosProvider';

function App() {
  return (
    <div className="App">
      <h1>Todo app</h1>
      <TodosProvider>
        <Todos />
      </TodosProvider>
    </div>
  );
}

export default App;
