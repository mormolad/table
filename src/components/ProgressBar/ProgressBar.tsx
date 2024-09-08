import { useSelector, useDispatch } from 'react-redux';
import style from './ProgressBar.module.scss';
import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { setIsProgress, setIsSend } from '../../store/progressSlics';

export default function ProgressBar() {
  const dispatch = useDispatch();

  // Устанавливаем начальное время завершения таймера
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 10); // добавляем 10 секунд

  // Получаем состояние прогресса из хранилища
  const isProgress = useSelector(
    (state: { reduserProgress: { isProgress: boolean } }) =>
      state.reduserProgress.isProgress
  );

  // Получаем данные, которые были отправлены
  const dataSend = useSelector(
    (state: { reduserProgress: { dataSend: string } }) =>
      state.reduserProgress.dataSend
  );

  // Инициализируем таймер с использованием useTimer
  const { seconds, start, restart } = useTimer({
    expiryTimestamp,
    autoStart: false, // Таймер не запускается автоматически
    onExpire: () => {
      dispatch(setIsProgress(false)); // Останавливаем прогресс после завершения таймера
      dispatch(setIsSend(true)); // Устанавливаем флаг отправки данных в true
      console.log(dataSend); //выводим в консоль отправленные данные, можно заменить отправкой на бэк
    },
  });

  // Используем useEffect для контроля запуска и перезапуска таймера в зависимости от isProgress
  useEffect(() => {
    if (isProgress) {
      start(); // Запускаем таймер, если прогресс активен
    } else {
      restart(expiryTimestamp, false); // Перезапускаем таймер с начальным значением и останавливаем его
    }
  }, [isProgress, restart, start, expiryTimestamp]);

  return (
    <div className={style.progressBar}>
      {isProgress && ( // Показываем прогресс бар и таймер, если isProgress true
        <>
          <div className={style.timer}>
            Отправка данных через {seconds} секунд
          </div>
          <progress
            className={style.progress}
            value={100 - seconds * 10} // Значение прогресса уменьшается каждую секунду
            max="100"
          ></progress>
        </>
      )}
    </div>
  );
}
