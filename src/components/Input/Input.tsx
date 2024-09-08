import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Input.module.scss';
import {
  setDataSend,
  setIsProgress,
  setIsSend,
} from '../../store/progressSlics';

interface ImportProps {
  beginValue: string | number; // Начальное значение поля ввода
  DATA_REGEXP: RegExp; // Регулярное выражение для проверки ввода
  additionalClass: string; // Дополнительный класс для стилей
  id: string; // Для идентификации ячейки
  textArea?: true; // Опционально: если true, будет использоваться <textarea>
}

export default function Input({
  beginValue,
  DATA_REGEXP,
  additionalClass,
  id,
  textArea,
}: ImportProps) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string | number>(beginValue); // Переменная для хранения введённого значения
  const [dirty, setDirty] = useState<boolean>(false); // Флаг для проверки, подвергалось ли поле изменениям
  const [error, setError] = useState<string>('Поле не может быть пустым'); // Начальная ошибка
  const [isValid, setIsValid] = useState(true); // Состояние валидности поля
  const [initialValue, setInitialValue] = useState<string | number>(beginValue); // Начальное значение, для проверки изменений
  const isSend = useSelector(
    // Переменная, подтверждающая отправку данных
    (state: { reduserProgress: { isSend: boolean } }) =>
      state.reduserProgress.isSend
  );

  function useDebouncedValue( // Функция для задержки изменения значения (дебаунсинг)
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
        // Если значение не валидно, сбрасываем таймер и очищаем значение
        clearTimeout(timer);
        setDebouncedValue('');
      }

      return () => {
        clearTimeout(timer);
      };
    }, [value, delay, isValid]);

    return debouncedValue;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    dispatch(setIsSend(false)); // Сбрасываем состояние отправки данных
    dispatch(setIsProgress(false)); // Отключаем прогресс бар при изменении данных
    setInputValue(newValue); // Устанавливаем новое значение в состояние
    setDirty(true); // Помечаем, что поле подвергалось изменениям

    // Проверка на ошибки
    if (!newValue) {
      setError('Поле пустое');
      setIsValid(false);
    } else if (!DATA_REGEXP.test(newValue)) {
      setError('Невалидные данные');
      setIsValid(false);
    } else {
      setError('');
      if (newValue !== initialValue) {
        // Если данные изменены и они валидны
        setIsValid(true);
        dispatch(
          setDataSend(`Данные отправлены. Id:${id}, значение: ${newValue}`)
        );
      }
    }
  };

  const debouncedSearchTerm = useDebouncedValue(inputValue, 5000, isValid);

  useEffect(() => {
    if (inputValue !== initialValue) {
      if (isValid && debouncedSearchTerm && debouncedSearchTerm !== '') {
        dispatch(setIsProgress(true)); // Устанавливаем прогресс, если данные валидны и изменены
      }
    }
  }, [debouncedSearchTerm, isValid, inputValue, initialValue, dispatch]);

  useEffect(() => {
    if (isSend) {
      setInitialValue(inputValue); // Обновляем начальное значение после успешной отправки
    }
  }, [isSend, inputValue]);
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
