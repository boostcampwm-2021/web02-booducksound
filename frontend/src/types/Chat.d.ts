export type Chat = {
  name: string;
  text: string;
  status: 'alert' | 'message';
  color?: string;
};
