import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
  Box,
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
      <DialogContent dividers sx={{ p: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '70vh', // Ajuste conforme necessário
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              p: 2,
              borderBottom: '1px solid #ccc',
            }}
          >
            {/* Área fixa com imagens */}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <img
                src={gifSrc}
                alt={`${selectedTrainer?.trainer_name} GIF`}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
              <img
                src={selectedTrainer?.badge_image}
                alt={`${selectedTrainer?.trainer_name} Badge`}
                style={{
                  width: '50%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              overflowY: 'auto',
              flexGrow: 1,
              p: 2,
            }}
          >
            <MatchTab
              firstMatchPokemons={selectedTrainer?.first_match_team}
              rematchPokemons={selectedTrainer?.rematch_team}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color='primary'>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
