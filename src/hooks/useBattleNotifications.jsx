import { useState, useCallback, useEffect } from 'react';
import trainer_data from '../assets/trainer_data.json';

function useBattleNotifications() {
  const [notifications, setNotifications] = useState([]);

  const getDayAndTime = useCallback(() => {
    const now = new Date();
    const days = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    const day = days[now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeLabel =
      hours >= 4 && hours < 10
        ? 'Manhã'
        : hours >= 10 && hours < 20
        ? 'Tarde'
        : 'Noite';
    return { day, hours, minutes, timeLabel };
  }, []);

  const checkIfAvailableBattles = useCallback(() => {
    const { day, timeLabel } = getDayAndTime();
    console.log('day', day);
    console.log('timeLabel', timeLabel);
    return trainer_data.filter((trainer) =>
      (trainer.battle_schedule || []).some(
        (s) =>
          s.day === day.split('-')[0] &&
          s.time.toLowerCase() === timeLabel.toLowerCase()
      )
    );
  }, [getDayAndTime]);

  const checkIfAvailableEncounters = useCallback(() => {
    const { day, hours, minutes } = getDayAndTime();
    const nowTotal = hours * 60 + minutes;

    return trainer_data.filter((trainer) => {
      if (!trainer.encounter_day) return false;
      const matchesDay =
        trainer.encounter_day.toLowerCase() === day.toLowerCase();
      if (!matchesDay) return false;

      const rawTime = trainer.encounter_time.toLowerCase().trim();
      if (rawTime === 'dia todo') return true;

      const parts = rawTime.split(/às/i).map((p) => p.trim());
      if (parts.length === 2) {
        const [startStr, endStr] = parts;
        const [startH, startM] = startStr.split(':').map(Number);
        const [endH, endM] = endStr.split(':').map(Number);
        const startTotal = startH * 60 + startM;
        const endTotal = endH * 60 + endM;
        return nowTotal >= startTotal && nowTotal <= endTotal;
      }

      return false;
    });
  }, [getDayAndTime]);

  const updateNotifications = useCallback(() => {
    const battles = checkIfAvailableBattles();
    const encounters = checkIfAvailableEncounters();

    const notifs = [];

    battles.forEach((trainer) => {
      notifs.push({
        type: 'battle',
        message: `${trainer.trainer_name} está disponível para batalha!`,
        trainer,
      });
    });

    encounters.forEach((trainer) => {
      notifs.push({
        type: 'encounter',
        message: `Encontro disponível: ${trainer.trainer_name}!`,
        trainer,
      });
    });

    if (notifs.length === 0) {
      notifs.push({
        type: 'none',
        message: 'Nenhum treinador disponível no momento.',
        trainer: null,
      });
    }

    setNotifications(notifs);
  }, [checkIfAvailableBattles, checkIfAvailableEncounters]);

  useEffect(() => {
    updateNotifications();
  }, [updateNotifications]);

  const removeNotification = useCallback((index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return { notifications, updateNotifications, removeNotification };
}

export default useBattleNotifications;
