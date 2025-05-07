import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Box,
  CardMedia,
  Checkbox,
} from '@mui/material';
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function ContactDialog({
  openDialog,
  handleCloseDialog,
  trainers,
}) {
  const [checkedTrainers, setCheckedTrainers] = React.useState([]);

  const handleChange = (event) => {
    const trainerName = event.target.value;
    const isChecked = event.target.checked;
    setCheckedTrainers((prev) =>
      isChecked
        ? [...prev, trainerName]
        : prev.filter((name) => name !== trainerName)
    );
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth='md'
    >
      <DialogTitle>Treinadores que possui o contato</DialogTitle>
      <DialogContent dividers sx={{ p: 2 }}>
        {/* Container flex para todas as fotos em row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
          }}
        >
          {trainers.map((trainer, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 140,
              }}
            >
              <Checkbox
                checked={checkedTrainers.includes(trainer.trainer_name)}
                value={trainer.trainer_name}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                disableRipple
                disableFocusRipple
                disableTouchRipple
              />
              <CardMedia
                component='img'
                image={trainer.trainer_picture}
                title={trainer.trainer_name}
                sx={{
                  width: '100%',
                  height: 140,
                  objectFit: 'contain',
                }}
              />
            </Box>
          ))}
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
