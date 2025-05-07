import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PokemonCard from './PokemonCard';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MatchTab({ firstMatchPokemons, rematchPokemons }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (_, newValue) => setValue(newValue);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          centered // <—— centraliza
          // variant='fullWidth' // opcional, distribui igualmente
        >
          <Tab label='Primeira batalha' {...a11yProps(0)} />
          <Tab label='Reencontro' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box sx={{ overflowY: 'auto', height: 'calc(100% - 48px)' }}>
        <CustomTabPanel value={value} index={0}>
          {firstMatchPokemons?.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {rematchPokemons?.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))}
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
