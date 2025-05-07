/* Updated component: NotificationMenu using trainerPNGMap for encounter images */
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import Popover from '@mui/material/Popover';
import useBattleNotifications from '../hooks/useBattleNotifications';
import { FaBell } from 'react-icons/fa';
import { trainerPNGMap } from '../assets/encounter_png_map';

export default function NotificationMenu({ openTrainerDialog }) {
  const { notifications, updateNotifications, removeNotification } =
    useBattleNotifications();
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [encounterAnchor, setEncounterAnchor] = React.useState(null);
  const [encounterImg, setEncounterImg] = React.useState('');

  const openMenu = Boolean(menuAnchor);
  const openEncounter = Boolean(encounterAnchor);

  const handleBellClick = (e) => {
    updateNotifications();
    setMenuAnchor(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    handleEncounterClose();
  };

  const handleNotificationClick = (e, notif) => {
    if (notif.type === 'battle') {
      openTrainerDialog(notif.trainer);
      handleMenuClose();
    } else if (notif.type === 'encounter') {
      // usa o map para pegar a imagem local correta
      const key = notif.trainer.trainer_name;
      const localImg = trainerPNGMap[key];
      setEncounterImg(localImg);
      setEncounterAnchor(e.currentTarget);
    }
  };

  const handleEncounterClose = () => {
    setEncounterAnchor(null);
    setEncounterImg('');
  };

  return (
    <>
      <IconButton
        onClick={handleBellClick}
        aria-controls={openMenu ? 'notification-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={openMenu ? 'true' : undefined}
      >
        <Badge
          badgeContent={notifications.length}
          color='error'
          overlap='circular'
        >
          <FaBell size={24} color='#f7c029' />
        </Badge>
      </IconButton>

      <Menu
        id='notification-menu'
        anchorEl={menuAnchor}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        MenuListProps={{ 'aria-labelledby': 'notification-button' }}
      >
        {notifications.map((notification, i) => (
          <MenuItem
            key={i}
            onClick={(e) => handleNotificationClick(e, notification)}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <ListItemText>{notification.message}</ListItemText>
            <IconButton
              size='small'
              onClick={(e) => {
                e.stopPropagation();
                removeNotification(i);
              }}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </MenuItem>
        ))}
      </Menu>

      <Popover
        open={openEncounter}
        anchorEl={encounterAnchor}
        onClose={handleEncounterClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{ sx: { p: 1 } }}
      >
        {encounterImg && (
          <img
            src={encounterImg}
            alt='Local de encontro'
            style={{ maxWidth: 300, maxHeight: 300 }}
          />
        )}
      </Popover>
    </>
  );
}
