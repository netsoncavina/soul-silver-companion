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
import { trainerGifMap } from '../assets/trainer_gif_map';
import MatchTab from './MatchTab';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function TrainerDialog({
  openDialog,
  handleCloseDialog,
  selectedTrainer,
}) {
  const gifSrc =
    trainerGifMap[selectedTrainer?.trainer_name] ||
    selectedTrainer?.trainer_gif;

  console.log('selectedTrainer', selectedTrainer.first_match_team);
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
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <img
              src={gifSrc}
              alt={`${selectedTrainer?.trainer_name} GIF`}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                marginBottom: '16px',
              }}
            />
            <img
              src={selectedTrainer?.badge_image}
              alt={`${selectedTrainer?.trainer_name} Badge`}
              style={{
                width: '50%',
                height: 'auto',
                objectFit: 'contain',
                marginBottom: '16px',
              }}
            />
          </div>
          <MatchTab
            firstMatchPokemons={selectedTrainer?.first_match_team}
            rematchPokemons={selectedTrainer?.rematch_team}
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
