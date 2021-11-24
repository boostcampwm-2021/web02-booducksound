import { toast } from 'react-toastify';

import { TOAST_OPTION } from '~/constants/index';

export const showAlert = (condition: boolean, message: string) => {
  if (!condition) return true;
  toast.error(message, TOAST_OPTION);
  return false;
};
