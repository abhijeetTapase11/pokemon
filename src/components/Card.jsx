import { useNavigate, useParams } from "react-router-dom";

const Card = ({ pokemon }) => {
  const username=useParams()
  const navigate = useNavigate();
  console.log(username,pokemon.name)
  const handleClick = () => {
    navigate(`/auth/${username.username}/${pokemon.name}`);
  };

  const imageUrl = pokemon.sprites?.front_default || 'https://via.placeholder.com/100'; 

  return (
    <div className="card" onClick={handleClick}>
      <img
        src={imageUrl}
        alt={pokemon.name}
        className="card-image"
      />
      <h3>{pokemon.name}</h3>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
};

export default Card
