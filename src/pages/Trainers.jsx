import Topbar from '../components/TopBar';
import trainer_data from '../assets/trainer_data.json';
import TrainerCard from '../components/TrainerCard';
import * as React from 'react';
import TrainerDialog from '../components/TrainerDialog';
import Button from '@mui/material/Button';
import ContactDialog from '../components/ContactDialog';

export default function Trainers() {
  const [selectedTrainer, setSelectedTrainer] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [contactOpenDialog, setContactOpenDialog] = React.useState(false);

  const handleOpenDialog = (trainer) => {
    setSelectedTrainer(trainer);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTrainer(null);
  };

  const handleOpenContactDialog = () => {
    setContactOpenDialog(true);
  };

  const handleCloseContactDialog = () => {
    setContactOpenDialog(false);
  };

  return (
    <>
      <Topbar title='Treinadores' openTrainerDialog={handleOpenDialog} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
        }}
      >
        <Button
          variant='contained'
          sx={{ backgroundColor: '#758AA6', color: '#f7c029' }}
          onClick={handleOpenContactDialog}
        >
          Contatos
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          justifyContent: 'center',
          padding: '16px',
        }}
      >
        {trainer_data.map((trainer, index) => (
          <TrainerCard
            key={index}
            trainer={trainer}
            onClick={() => handleOpenDialog(trainer)}
          />
        ))}
        {selectedTrainer && (
          <TrainerDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            selectedTrainer={selectedTrainer}
          />
        )}

        <ContactDialog
          openDialog={contactOpenDialog}
          handleCloseDialog={handleCloseContactDialog}
          trainers={trainer_data}
        />
      </div>
    </>
  );
}
