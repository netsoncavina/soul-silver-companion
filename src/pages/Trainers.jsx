import Topbar from '../components/TopBar';
import trainer_data from '../assets/trainer_data.json';
import TrainerCard from '../components/TrainerCard';

export default function Trainers() {
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
          <TrainerCard key={index} trainer={trainer} />
        ))}
      </div>
    </>
  );
}
