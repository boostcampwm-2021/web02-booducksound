const clearTimer = (timer: NodeJS.Timeout | null) => {
  if (!timer) return;
  clearTimeout(timer);
};

export default clearTimer;
