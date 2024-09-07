import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Input.module.scss';
import { setIsProgress } from '../../store/progressSlics';
interface ImportProps {
  beginValue: string | number;
  DATA_REGEXP: RegExp;
  additionalClass: string;
  id: string; // Для идентификации ячейки
  textArea?: true;
}

export default function Import({
  beginValue,
  DATA_REGEXP,
  additionalClass,
  id,
  textArea,
}: ImportProps) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string | number>(beginValue);
  //const [value, setValue] = useState<string | number>(beginValue);
  const [dirty, setDirty] = useState<boolean>(false);
  const [error, setError] = useState<string>('Поле не может быть пустым');
  const [isValid, setIsValid] = useState(true); // состояние валидности
  const [initialValue, setInitialValue] = useState<string | number>(beginValue); // Сохраняем начальное значение
  function useDebouncedValue(
    value: string | number,
    delay: number,
    isValid: boolean
  ) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      if (!isValid) {
        clearTimeout(timer);
        setDebouncedValue('');
      }
      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    dispatch(setIsProgress(false)); //при изменении в поле ввода отключаем прогресс бар длдя проверки на валидность.
    setInputValue(newValue);
    setDirty(true); // помечаем, что поле подвергалось исправлениям
    //Проверка на ошибки
    if (!newValue) {
      setError('Поле пустое');
      setIsValid(false);
    } else if (!DATA_REGEXP.test(newValue)) {
      setError('Невалидные данные');
      setIsValid(false);
    } else {
      setError('');
      // Если данные изменены и они валидны, перезапускаем таймер
      if (newValue !== initialValue) {
        setIsValid(true); // валидно
      }
    }
  };

  const debouncedSearchTerm = useDebouncedValue(inputValue, 3000, isValid);

  useEffect(() => {
    if (inputValue !== initialValue) {
      // Проверка на валидность перед выполнением поиска
      if (isValid && debouncedSearchTerm && debouncedSearchTerm !== '') {
        console.log('Выполняем поиск по:', debouncedSearchTerm);
        dispatch(setIsProgress(true));
      }
    }
  }, [debouncedSearchTerm, isValid]);

  

  return (
    <div className={style.containerInput}>
      {!textArea ? (
        <input
          className={`${style.valueInput} ${additionalClass}`}
          value={inputValue}
          onChange={handleChange}
        />
      ) : (
        <textarea
          className={`${style.valueInput} ${additionalClass}`}
          value={inputValue}
          onChange={handleChange}
        />
      )}
      <span className={style.inputError}>
        {dirty ? (error ? error : '') : ' '}
      </span>
    </div>
  );
}
