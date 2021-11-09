export const swap = <T>(i: number, j: number, arr: T[]) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
};
