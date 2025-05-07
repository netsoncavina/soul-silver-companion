import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';

const CustomDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const routes = [
    {
      name: 'Home',
      route: '/soul-silver-companion',
    },
    {
      name: 'Pokemons',
      route: '/pokemons',
    },
  ];

  const drawerList = (
    <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}>
      {routes.map((route, index) => (
        <ListItemButton key={index} onClick={() => navigate(route.route)}>
          <ListItemText primary={route.name} />
        </ListItemButton>
      ))}
    </Box>
  );

  return (
    <>
      <IconButton
        size='large'
        edge='start'
        color='#f7c029'
        aria-label='menu'
        sx={{ mr: 2 }}
        onClick={toggleDrawer(!open)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor='left'
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#758AA6',
            color: '#f7c029',
          },
        }}
      >
        {drawerList}
      </Drawer>
    </>
  );
};

export default CustomDrawer;
