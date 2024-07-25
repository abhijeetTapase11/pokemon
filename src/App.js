import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AllCards from './components/AllCards';
import PokemonDetail from './components/PokemonDetail';
import LoginPage from './components/LoginPage';
import { useSelector } from 'react-redux';

const App = () => {
  const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/:username" element={<PrivateRoute><AllCards /></PrivateRoute>} />
        <Route path="/auth/:username/:pokemonName" element={<PrivateRoute><PokemonDetail /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
