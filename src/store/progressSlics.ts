import { createSlice } from '@reduxjs/toolkit';

interface ProgressState {
  isProgress: boolean; // булевая переменная для отслеживания прогресса
  progress: number;
}

const repositorySlice = createSlice({
  name: 'isProgressState',
  initialState: {
    isProgress: false, // переменная для отображения или скрытия компонента прогрессбар
    progress: 0, // переменная показывающая шкалу прогресса
  } as ProgressState,
  reducers: {
    setIsProgress(state: ProgressState, action: { payload: boolean }) {
      state.isProgress = action.payload; // Обновляем значение переменной isProgress
    },
    setProgress(state: ProgressState, action: { payload: number }) {
      state.progress = action.payload; // Обновляем значение переменной progress
    },
  },
});

export default repositorySlice.reducer;
export const { setProgress, setIsProgress } = repositorySlice.actions;
