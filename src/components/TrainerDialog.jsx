import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
} from '@mui/material';
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function TrainerDialog({
  openDialog,
  handleCloseDialog,
  selectedTrainer,
}) {
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby='trainer-dialog-description'
    >
      <DialogTitle>{selectedTrainer?.trainer_name}</DialogTitle>
      <DialogContent dividers>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <img
            src={selectedTrainer?.trainer_gif}
            alt={selectedTrainer?.trainer_gif}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              marginBottom: '16px',
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color='primary'>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
