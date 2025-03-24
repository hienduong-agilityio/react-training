// Libraries
import { create } from 'zustand';

interface IToastState {
  // message: The message to be displayed in the toast
  message: string;
  // type: The type of toast ('success' or 'error')
  type: 'success' | 'error';
  // isVisible: A flag to determine if the toast is visible
  isVisible: boolean;
  // undoEnabled: A flag to determine if the undo option is enabled
  undoEnabled: boolean;
  // timeoutDuration: Optional duration for how long the toast will be visible
  timeoutDuration?: number;
  // showToast: Function to show the toast with specified parameters
  showToast: (message: string, type: 'success' | 'error', timeoutDuration?: number, undoEnabled?: boolean) => void;
  // hideToast: Function to hide the toast
  hideToast: () => void;
}

export const ToastStore = create<IToastState>((set) => ({
  message: '',
  type: 'success',
  isVisible: false,
  undoEnabled: false,
  timeoutDuration: 3000,

  showToast: (message, type, timeoutDuration = 3000, undoEnabled = false) =>
    set({ message, type, isVisible: true, undoEnabled, timeoutDuration }),

  hideToast: () => set({ isVisible: false })
}));
