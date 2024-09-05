import React, { useState } from 'react';
import style from './Dashboard.module.scss';

export const Dashboard: React.FC = () => {
  const [date, setDate] = useState({ title: '30 января 2024', value: '' });
  const [shift, setShift] = useState({ title: 'Смена', value: 2 });
  const [master, setMaster] = useState({
    title: 'Мастер',
    value: 'Иванов И. И.',
  });
  const [rptkm, setRptkm] = useState({ title: 'РПТКМ-120', value: '' });
  const [personnel, setPersonnel] = useState({ title: 'Персонал', value: '' });
  const [people, setPeople] = useState({ title: 'человек', value: 100500 });
  const [comment, setComment] = useState({
    title: '',
    value: 'Комментарий в 3-5 строчек, который тоже можно редактировать.',
  });
  const [ktp, setKtp] = useState({ title: 'КТП 2000 321', value: '' });
  const [work, setWork] = useState({ title: 'Работает', value: '' });
  const [workingUnits, setWorkingUnits] = useState({ title: '', value: 24 });
  const [spi, setSpi] = useState({ title: 'SPI 3432', value: '' });
  const [percent, setPercent] = useState({ title: '', value: `${98.3} %` });
  const [works, setWorks] = useState({
    title: '',
    value: 'Функционирует, но не бьет',
  });

  return (
    <div className={style.dashboard}>
      <div className={`${style.item} ${style.item_grey} ${style.date}`}>
        <input
          className={`${style.value} ${style.value_gray}`}
          value={date.title}
        ></input>
      </div>
      <div className={`${style.item} ${style.item_grey} ${style.shift}`}>
        <p className={style.title}>{shift.title}</p>
        <input
          className={`${style.value} ${style.value_gray}`}
          value={shift.value}
        ></input>
      </div>
      <div className={`${style.item} ${style.item_grey} ${style.master}`}>
        <p className={style.title}>{master.title}</p>
        <input
          className={`${style.value} ${style.value_gray}`}
          value={master.value}
        ></input>
      </div>
      <div className={`${style.item} ${style.item_grey} ${style.rptkm}`}>
        <input
          className={`${style.value} ${style.value_gray}`}
          value={rptkm.title}
        ></input>
      </div>
      <div className={`${style.item} ${style.personnel}`}>
        <input className={style.value} value={personnel.title}></input>
      </div>
      <div className={`${style.item}  ${style.people}`}>
        {' '}
        <input className={style.value} value={people.value}></input>
        <p className={style.title}>{people.title}</p>
      </div>
      <div className={`${style.item} ${style.comment}`}>
        <textarea className={style.value} value={comment.value}></textarea>
      </div>
      <div className={`${style.item} ${style.ktp}`}>
        <input className={style.value} value={ktp.title}></input>
      </div>
      <div className={`${style.item} ${style.work}`}>
        <input className={style.value} value={work.title}></input>
      </div>
      <div className={`${style.item} ${style.workingUnits}`}>
        <input className={style.value} value={workingUnits.value}></input>
      </div>
      <div className={`${style.item} ${style.spi}`}>
        <input className={style.value} value={spi.title}></input>
      </div>
      <div className={`${style.item} ${style.percent}`}>
        <input className={style.value} value={percent.value}></input>
      </div>
      <div className={`${style.item} ${style.works}`}>
        <input className={style.value} value={works.value}></input>
      </div>
    </div>
  );
};
