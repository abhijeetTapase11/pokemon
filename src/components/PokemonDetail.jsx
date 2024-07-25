import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/PokemonDetail.css';
import Navbar from './Navbar';

const PokemonDetail = () => {
  const { pokemonName } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        setPokemonData(response.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchPokemonData();
  }, [pokemonName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar/>
      <div className="pokemon-detail">
        <h1>{pokemonData.name}</h1>
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        <p>Height: {pokemonData.height}</p>
        <p>Weight: {pokemonData.weight}</p>
      </div>
    </>
  );
};

export default PokemonDetail;
