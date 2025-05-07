import Topbar from '../components/TopBar';
import trainer_data from '../assets/trainer_data.json';

export default function Trainers() {
  return (
    <>
      <Topbar title='Treinadores' />

      <h1 className='text-4xl font-bold text-white mb-8'>Trainers</h1>

      <div className='flex flex-wrap justify-start gap-8 p-4'>
        {trainer_data.map((trainer) => (
          <div
            key={trainer.trainer_name}
            className='bg-white rounded-lg shadow-lg p-6 max-w-xs'
          >
            <h2 className='text-2xl font-bold mb-4'>{trainer.trainer_name}</h2>
            <img
              src={trainer.trainer_picture}
              alt={trainer.trainer_name}
              className='w-full h-auto rounded-lg'
            />
          </div>
        ))}
      </div>
      {/* </div> */}
    </>
  );
}
