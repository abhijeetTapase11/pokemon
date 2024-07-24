import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; // Import your CSS for Navbar
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login');
  };

  return (
    <nav className="navbar">
        <h1 className="navbar-title">Pokémon App</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
    </nav>
  );
};

export default Navbar;
