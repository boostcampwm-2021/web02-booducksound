import { ChangeEventHandler, KeyboardEventHandler } from 'react';

export type InputTextProps = {
  type?: 'text' | 'password';
  name?: string;
  disabled?: boolean;
  isSearch: boolean;
  placeholder: string;
  className: string;
  value: string;
  handleEnter?: Function;
  handleKeyDown?: KeyboardEventHandler;
  handleChange?: ChangeEventHandler;
};
