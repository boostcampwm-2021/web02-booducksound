import { toast } from 'react-toastify';

export const showAlert = (condition: boolean, message: string) => {
  if (!condition) return true;
  toast.error(message);
  return false;
};
