import React from 'react';
import { FaBell } from 'react-icons/fa';

function Notification({ notifications = [] }) {
  const onClick = () => {
    console.log('Notification clicked', notifications);
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onClick={onClick}
    >
      <FaBell size={30} color='#f7c029' />
      {notifications.length > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {notifications.length}
        </span>
      )}
    </div>
  );
}

export default Notification;
