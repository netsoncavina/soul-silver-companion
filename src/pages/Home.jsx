import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bem-vindo ao Soul Silver Companion!</h1>
      <button onClick={() => navigate('/trainers')} style={{ margin: '10px' }}>
        Treinadores
      </button>
      <button onClick={() => navigate('/pokemons')} style={{ margin: '10px' }}>
        Pokémons
      </button>
    </div>
  );
}
