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
  const [checkedTrainers, setCheckedTrainers] = React.useState(() => {
    try {
      const item = window.localStorage.getItem('checkedTrainers');
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    window.localStorage.setItem(
      'checkedTrainers',
      JSON.stringify(checkedTrainers)
    );
  }, [checkedTrainers]);

  const handleChange = (e) => {
    const name = e.target.value;
    const checked = e.target.checked;
    setCheckedTrainers((prev) =>
      checked ? [...prev, name] : prev.filter((n) => n !== name)
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
          }}
        >
          {trainers.map((t, idx) => (
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
                checked={checkedTrainers.includes(t.trainer_name)}
                value={t.trainer_name}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                disableRipple
                disableFocusRipple
                disableTouchRipple
              />
              <CardMedia
                component='img'
                image={t.trainer_picture}
                title={t.trainer_name}
                sx={{ width: '100%', height: 140, objectFit: 'contain' }}
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
