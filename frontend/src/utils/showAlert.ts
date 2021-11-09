export const showAlert = (condition: boolean, message: string) => {
  if (!condition) return true;
  alert(message);
  return false;
};
