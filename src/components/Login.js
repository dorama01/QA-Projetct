import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      onLogin(res.data.token);
    } catch {
      alert('Login failed');
    }
  };

 return (
  <form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: '400px' }}>
    <h2 className="mb-4">Login</h2>
    <div className="mb-3">
      <input
        name="email"
        className="form-control"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <input
        name="password"
        type="password"
        className="form-control"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
    </div>
    <button type="submit" className="btn btn-primary w-100">Login</button>
  </form>
);

}
