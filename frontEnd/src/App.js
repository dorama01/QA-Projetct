import { useState } from 'react';
import Login from './components/Login';
import TodoList from './components/TodoList';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      {!token ? <Login onLogin={setToken} /> : <TodoList />}
    </div>
  );
}

export default App;
