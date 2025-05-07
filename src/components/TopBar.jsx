import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationIcon from './Notification';
import CustomDrawer from './CustomDrawer';

export default function TopBar({ title, openTrainerDialog }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor: '#758AA6' }}>
        <Toolbar>
          <CustomDrawer />

          <Typography
            variant='h4'
            fontWeight={700}
            component='div'
            sx={{ flexGrow: 1 }}
            color='#f7c029'
          >
            {title}
          </Typography>
          <NotificationIcon
            notifications={[1, 2, 3, 4, 5, 6]}
            openTrainerDialog={openTrainerDialog}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
