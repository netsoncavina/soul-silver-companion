import { useState, useCallback, useEffect } from 'react';
import trainer_data from '../assets/trainer_data.json';

function useBattleNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const getDayAndTime = useCallback(() => {
    const now = new Date();
    const days = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];
    const day = days[now.getDay()];
    const h = now.getHours();
    const time =
      h >= 4 && h < 10 ? 'Manhã' : h >= 10 && h < 20 ? 'Tarde' : 'Noite';
    return { day, time };
  }, []);

  const checkIfAvailableBattles = useCallback(() => {
    const { day, time } = getDayAndTime();
    return trainer_data.filter((trainer) =>
      (trainer.battle_schedule || []).some(
        (s) => s.day === day && s.time === time
      )
    );
  }, [getDayAndTime]);

  const updateNotifications = useCallback(() => {
    const available = checkIfAvailableBattles();
    if (available.length > 0) {
      setNotifications(
        available.map((trainer) => ({
          message: `${trainer.trainer_name} está disponível para batalha!`,
          trainer,
        }))
      );
    } else {
      setNotifications([
        {
          message: 'Nenhum treinador disponível no momento.',
          trainer: null,
        },
      ]);
    }
  }, [checkIfAvailableBattles]);

  useEffect(() => {
    const available = checkIfAvailableBattles();
    if (available.length > 0) {
      setNotifications(
        available.map((t) => `${t.trainer_name} está disponível para batalha!`)
      );
    } else {
      setNotifications(['Nenhum treinador disponível no momento.']);
    }
  }, [checkIfAvailableBattles]);

  const removeNotification = useCallback((index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return {
    notifications,
    showNotifications,
    updateNotifications,
    removeNotification,
  };
}

export default useBattleNotifications;
