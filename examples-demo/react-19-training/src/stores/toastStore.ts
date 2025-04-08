// Libraries
import { create } from 'zustand';

// Types
export type ToastType = (typeof STATUS_TYPES)[keyof typeof STATUS_TYPES];

import { STATUS_TYPES } from '../constants';

interface IToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
  timeoutDuration?: number;
  showToast: (message: string, type: ToastType, timeoutDuration?: number, undoEnabled?: boolean) => void;
  hideToast: () => void;
}

export const ToastStore = create<IToastState>((set) => ({
  message: '',
  type: STATUS_TYPES.SUCCESS,
  isVisible: false,
  timeoutDuration: 3000,

  showToast: (message, type, timeoutDuration = 3000) => set({ message, type, isVisible: true, timeoutDuration }),

  hideToast: () => set({ isVisible: false })
}));
