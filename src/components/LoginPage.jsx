import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup } from '../features/authActions';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // Optional: For additional styling

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/auth/${username}`);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = () => {
    if (isSignup) {
      dispatch(signup(username, password));
      setIsSignup(false); // Switch back to login after signup
    } else {
      dispatch(login(username, password));
    }
  };

  return (
    <div className="login-page">
      <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
      <div className="login-form">
        <input
          type="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
