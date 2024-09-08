import style from './Main.module.scss';
import Dashboard from '../Dashboard/Dashboard';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function Main() {
  return (
    <main className={style.main}>
      <Dashboard />
      <ProgressBar />
    </main>
  );
}
