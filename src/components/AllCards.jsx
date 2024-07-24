import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import '../styles/AllCards.css'; // Optional: For additional styling
import Navbar from './Navbar';

const AllCards = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`);
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return details.data;
          })
        );
        setData(prevData => [...prevData, ...pokemonData]);
        if (pokemonData.length < 20) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
        return;
      }
      if (hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <>
      <Navbar/>
      <div className="all-cards">
        {data.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
        {loading && <p>Loading...</p>}
        {!loading && !hasMore && <p>No more data</p>}
      </div>
    </>
  );
};

export default AllCards;
