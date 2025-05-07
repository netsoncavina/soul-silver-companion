import React from 'react';

export default function PokemonCard({ pokemon }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '16px',
      }}
    >
      <img
        src={pokemon.sprite_url}
        alt={pokemon.name}
        style={{ width: '50px', height: '50px' }}
      />
      <span style={{ fontSize: '12px', marginBottom: '4px', color: 'gray' }}>
        {pokemon.pokedexNumber}
      </span>
      <span style={{ fontSize: '14px', textTransform: 'capitalize' }}>
        {pokemon.name}
      </span>
      <span
        style={{
          fontSize: '12px',
          color: 'gray',
          textTransform: 'capitalize',
        }}
      >
        {pokemon.level} - {pokemon.types[0]}
        {pokemon.types[1] && ` / ${pokemon.types[1]}`}
      </span>
    </div>
  );
}
