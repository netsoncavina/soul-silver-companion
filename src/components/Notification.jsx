import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import { FaBell } from 'react-icons/fa';
import useBattleNotifications from '../hooks/useBattleNotifications';

export default function NotificationMenu({ openTrainerDialog }) {
  const { notifications, updateNotifications, removeNotification } =
    useBattleNotifications();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    updateNotifications();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notif) => {
    if (notif.type === 'battle') {
      openTrainerDialog(notif.trainer);
    } else if (notif.type === 'encounter') {
      window.open(notif.trainer.encounter_location_img, '_blank');
    }
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? 'notification-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
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
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        MenuListProps={{ 'aria-labelledby': 'notification-button' }}
      >
        {notifications.map((notification, i) => (
          <MenuItem
            key={i}
            onClick={() => handleNotificationClick(notification)}
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
    </>
  );
}
