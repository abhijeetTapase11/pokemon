import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import '../styles/AllCards.css'; 
import Navbar from './Navbar';

const AllCards = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}?limit=20&offset=${(page - 1) * 20}`);
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return details.data;
          })
        );
        setData(pokemonData);
        if (pokemonData.length < 20) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page, url]);

  const handleNextPage = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

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
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={!hasMore}>Next</button>
      </div>
    </>
  );
};

export default AllCards;
