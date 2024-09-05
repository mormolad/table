import style from './Main.module.scss';
import { Dashboard } from '../Dashboard/Dashboard';

export default function Main() {
  return (
    <main className={style.main}>
      <Dashboard />
    </main>
  );
}
