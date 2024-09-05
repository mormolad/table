import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Input.module.scss';
import { setProgress, setIsProgress } from '../../store/progressSlics';
interface ImportProps {
  beginValue: string | number;
  DATA_REGEXP: RegExp;
  additionalClass: string;
  id: string; // Для идентификации ячейки
}

export default function Import({
  beginValue,
  DATA_REGEXP,
  additionalClass,
  id,
}: ImportProps) {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string | number>(beginValue);
  const [dirty, setDirty] = useState<boolean>(false);
  const [error, setError] = useState<string>('Поле не может быть пустым');
  const [, setSecondsRemaining] = useState<number>(10);
  const [initialValue, setInitialValue] = useState<string | number>(beginValue); // Сохраняем начальное значение
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Для отслеживания таймера
  const progressRef = useRef<NodeJS.Timeout | null>(null); // Для отслеживания интервала прогресса
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    clearProgressAndTimer();
    dispatch(setIsProgress(false));
    setValue(newValue);
    setDirty(true);
    // Проверка на ошибки
    if (!newValue) {
      setError('Поле пустое');
      clearProgressAndTimer();
    } else if (!DATA_REGEXP.test(newValue)) {
      setError('Невалидные данные');
      clearProgressAndTimer();
    } else {
      setError('');
      // Если данные изменены и они валидны, перезапускаем таймер
      if (newValue !== initialValue) {
        resetTimer(e.target.value);
      }
    }
  };

  const resetTimer = (valueSend: string) => {
    clearProgressAndTimer();
    dispatch(setProgress(0));
    setSecondsRemaining(10);
    // Запуск нового таймера на 5 секунд
    timerRef.current = setTimeout(() => {
      // Запуск прогресса после 5 секунд бездействия
      dispatch(setIsProgress(true));
      startProgressCountdown(valueSend);
    }, 5000);
  };

  const clearProgressAndTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }
    dispatch(setProgress(0));
    setSecondsRemaining(10);
  };

  const startProgressCountdown = (valueSend: string) => {
    dispatch(setProgress(0));
    let loadСounter = 0;
    progressRef.current = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(progressRef.current!);
          progressRef.current = null;
          console.log(`Данные отправлены: ${id}, значение: ${valueSend}`);
          setInitialValue(valueSend);
          dispatch(setIsProgress(false));
          return 0;
        }
        return prevSeconds - 1;
      });
      loadСounter = loadСounter + 10;
      dispatch(setProgress(loadСounter));
    }, 1000); // Обновляем прогресс каждую секунду
  };

  // Очищаем таймеры при размонтировании компонента
  useEffect(() => {
    return () => {
      clearProgressAndTimer();
    };
  }, []);

  return (
    <div className={style.containerInput}>
      <input
        className={`${style.valueInput} ${additionalClass}`}
        value={value}
        onChange={handleChange}
      />
      <span className={style.inputError}>
        {dirty ? (error ? error : '') : ' '}
      </span>
    </div>
  );
}
