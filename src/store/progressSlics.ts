import { createSlice } from '@reduxjs/toolkit';

interface ProgressState {
  isProgress: boolean;
  isSend: boolean;
  dataSend: string;
}

const repositorySlice = createSlice({
  name: 'isProgressState',
  initialState: {
    isProgress: false, // переменная для отображения или скрытия компонента прогрессбар
    isSend: false, // переменная показывающая шкалу прогресса
    dataSend: '', // данные для вывода в консоль
  } as ProgressState,
  reducers: {
    setIsProgress(state: ProgressState, action: { payload: boolean }) {
      state.isProgress = action.payload; // Обновляем значение переменной isProgress
    },
    setIsSend(state: ProgressState, action: { payload: boolean }) {
      state.isSend = action.payload; // Обновляем значение переменной progress
    },
    setDataSend(state: ProgressState, action: { payload: string }) {
      state.dataSend = action.payload; // Обновляем значение переменной progress
    },
  },
});

export default repositorySlice.reducer;
export const { setIsSend, setIsProgress, setDataSend } =
  repositorySlice.actions;
