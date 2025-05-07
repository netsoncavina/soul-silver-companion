import Topbar from '../components/TopBar';
import trainer_data from '../assets/trainer_data.json';
import TrainerCard from '../components/TrainerCard';
import * as React from 'react';
import TrainerDialog from '../components/TrainerDialog';

export default function Trainers() {
  const [selectedTrainer, setSelectedTrainer] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = (trainer) => {
    setSelectedTrainer(trainer);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTrainer(null);
  };
  return (
    <>
      <Topbar title='Treinadores' />
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
        <TrainerDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          selectedTrainer={selectedTrainer}
        />
      </div>
    </>
  );
}
