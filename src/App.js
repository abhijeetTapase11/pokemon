import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AllCards from './components/AllCards';
import PokemonDetail from './components/PokemonDetail';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/:username" element={<AllCards />} />
        <Route path="/auth/:username/:pokemonName" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
