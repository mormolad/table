import { useSelector } from 'react-redux';
import style from './ProgressBar.module.scss';

export default function ProgressBar() {
  const progress = useSelector(
    (state: { reduserProgress: { progress: any } }) =>
      state.reduserProgress.progress
  );
  const isProgress = useSelector(
    (state: { reduserProgress: { isProgress: any } }) =>
      state.reduserProgress.isProgress
  );
  return (
    <div className={style.progressBar}>
      {isProgress && (
        <>
          <div className={style.timer}>
            Отправка данных через {progress / 10} секунд
          </div>
          <progress
            className={style.progress}
            value={progress}
            max="100"
          ></progress>
        </>
      )}
    </div>
  );
}
