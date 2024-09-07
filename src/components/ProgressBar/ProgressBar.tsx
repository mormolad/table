import { useSelector, useDispatch } from 'react-redux';
import style from './ProgressBar.module.scss';
import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { setIsProgress } from '../../store/progressSlics';
export default function ProgressBar() {
  const dispatch = useDispatch();
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 10); // добавляем 10 секунд

  const isProgress = useSelector(
    (state: { reduserProgress: { isProgress: any } }) =>
      state.reduserProgress.isProgress
  );

  const { seconds, start, restart } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => dispatch(setIsProgress(false)),
  });

  useEffect(() => {
    if (isProgress) {
      start();
    } else {
      restart(expiryTimestamp, false);
    }
  }, [isProgress]);

  return (
    <div className={style.progressBar}>
      {isProgress && (
        <>
          <div className={style.timer}>
            Отправка данных через {seconds} секунд
          </div>
          <progress
            className={style.progress}
            value={100 - seconds * 10}
            max="100"
          ></progress>
        </>
      )}
    </div>
  );
}
