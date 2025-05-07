import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Trainers from './pages/Trainers';
import Pokemons from './pages/Pokemons';

function App() {
  return (
    <Routes>
      <Route path='/soul-silver-companion' element={<Home />} />
      <Route path='/trainers' element={<Trainers />} />
      <Route path='/pokemons' element={<Pokemons />} />
    </Routes>
  );
}

export default App;
