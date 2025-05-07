import Topbar from '../components/TopBar';
import trainer_data from '../assets/trainer_data.json';
// import { useState } from 'react';

export default function Trainers() {
  //   const [notifications, setNotifications] = useState([]);
  //   const [showNotifications, setShowNotifications] = useState(false);

  //   const toggleNotifications = () => {
  //     setNotifications([]);

  //     const availableBattles = checkIfAvailableBattles();
  //     if (availableBattles.length > 0) {
  //       const messages = availableBattles.map((trainer) => {
  //         return `${trainer.trainer_name} está disponível para batalha!`;
  //       });
  //       setNotifications(messages);
  //     } else {
  //       setNotifications(['Nenhum treinador disponível no momento.']);
  //     }
  //     setShowNotifications(!showNotifications);
  //   };

  //   function checkIfAvailableBattles() {
  //     const { day, time } = getDayAndTime();

  //     const availableBattles = trainer_data.filter((trainer) => {
  //       const battleSchedule = trainer.battle_schedule || [];
  //       return battleSchedule.some((schedule) => {
  //         return schedule.day === day && schedule.time === time;
  //       });
  //     });
  //     return availableBattles;
  //   }

  //   function getDayAndTime() {
  //     const now = new Date();
  //     const daysOfWeek = [
  //       'Domingo',
  //       'Segunda',
  //       'Terça',
  //       'Quarta',
  //       'Quinta',
  //       'Sexta',
  //       'Sábado',
  //     ];

  //     const day = daysOfWeek[now.getDay()];
  //     const hours = now.getHours();

  //     let time;
  //     if (hours >= 4 && hours < 10) {
  //       time = 'Manhã';
  //     } else if (hours >= 10 && hours < 20) {
  //       time = 'Tarde';
  //     } else {
  //       time = 'Noite';
  //     }

  //     return {
  //       day,
  //       time,
  //     };
  //   }

  return (
    <>
      <Topbar title='Treinadores' />
      {/* <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-blue-700'>
        {showNotifications && (
          <div className='absolute top-16 right-4 bg-white shadow-lg rounded-lg w-64 p-4'>
            <h3 className='font-bold text-lg'>Notificações</h3>
            <ul className='mt-2'>
              {notifications.map((message, index) => (
                <li key={index} className='text-sm text-gray-800 mb-2'>
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )} */}

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
