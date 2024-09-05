import React, { useState } from 'react';
import style from './Dashboard.module.scss';
import Input from '../Input/Input';
import {
  DATE_REGEXP,
  SHIFT_REGEXP,
  NUMBER_REGEXP,
  FIO_REGEXP,
  ANY_REGEXP,
  PHRASE_REGEXP,
  FRACTIONAL_REGEXP,
} from '../../constants/regexp';

export default function Dashboard() {
  // данные приходящие с API
  const date = '30 января 2024';
  const shift = 2;
  const master = 'Иванов И. И.';
  const rptkm = 'РПТКМ-120';
  const personnel = 'Персонал';
  const people = 100500;
  const comment =
    'Комментарий в 3-5 строчек, который тоже можно редактировать.';
  const ktp = 'КТП 2000 321';
  const work = 'Работает';
  const workingUnits = 24;
  const spi = 'SPI 3432';
  const percent = 98.3;
  const works = 'Функционирует, но не бьет';

  return (
    <div className={style.dashboard}>
      <div className={`${style.item} ${style.date}`}>
        <Input
          beginValue={date}
          DATA_REGEXP={DATE_REGEXP}
          additionalClass={style.valueInput_date}
          id="1"
        />
      </div>
      <div className={`${style.item} ${style.shift}`}>
        <p className={style.title}>Смена:</p>
        <Input
          beginValue={shift}
          DATA_REGEXP={SHIFT_REGEXP}
          additionalClass={style.valueInput_shift}
          id="2"
        />
      </div>
      <div className={`${style.item} ${style.master}`}>
        <p className={style.title}>Мастер: </p>
        <Input
          beginValue={master}
          DATA_REGEXP={FIO_REGEXP}
          additionalClass={style.valueInput_master}
          id="3"
        />
      </div>
      <div className={`${style.item} ${style.rptkm}`}>
        <Input
          beginValue={rptkm}
          DATA_REGEXP={ANY_REGEXP}
          additionalClass={style.valueInput_rptkm}
          id="4"
        />
      </div>
      <div className={`${style.item} ${style.personnel}`}>
        <Input
          beginValue={personnel}
          DATA_REGEXP={PHRASE_REGEXP}
          additionalClass={style.valueInput_personnel}
          id="5"
        />
      </div>
      <div className={`${style.item}  ${style.people}`}>
        <Input
          beginValue={people}
          DATA_REGEXP={NUMBER_REGEXP}
          additionalClass={style.valueInput_people}
          id="6"
        />
        <p className={style.title}>человек</p>
      </div>
      <div className={`${style.item} ${style.comment}`}>
        <textarea className={style.value} value={comment}></textarea>
      </div>
      <div className={`${style.item} ${style.ktp}`}>
        <Input
          beginValue={ktp}
          DATA_REGEXP={ANY_REGEXP}
          additionalClass={style.valueInput_ktp}
          id="8"
        />
      </div>

      <div className={`${style.item} ${style.work}`}>
        <Input
          beginValue={work}
          DATA_REGEXP={PHRASE_REGEXP}
          additionalClass={style.valueInput_work}
          id="9"
        />
      </div>
      <div className={`${style.item} ${style.workingUnits}`}>
        <Input
          beginValue={workingUnits}
          DATA_REGEXP={NUMBER_REGEXP}
          additionalClass={style.valueInput_workingUnits}
          id="10"
        />
      </div>
      <div className={`${style.item} ${style.spi}`}>
        <Input
          beginValue={spi}
          DATA_REGEXP={ANY_REGEXP}
          additionalClass={style.valueInput_spi}
          id="11"
        />
      </div>
      <div className={`${style.item} ${style.percent}`}>
        <Input
          beginValue={percent}
          DATA_REGEXP={FRACTIONAL_REGEXP}
          additionalClass={style.valueInput_percent}
          id="12"
        />
        <p>%</p>
      </div>
      <div className={`${style.item} ${style.works}`}>
        <Input
          beginValue={works}
          DATA_REGEXP={PHRASE_REGEXP}
          additionalClass={style.valueInput_works}
          id="13"
        />
      </div>
    </div>
  );
}
