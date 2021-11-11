import { ChangeEventHandler, KeyboardEventHandler } from 'react';

export default interface InputTextProps {
  type?: 'text' | 'password';
  name?: string;
  disabled?: boolean;
  isSearch: boolean;
  placeholder: string;
  className: string;
  value: string;
  handleEnter?: KeyboardEventHandler;
  handleKeyDown?: KeyboardEventHandler;
  handleChange?: ChangeEventHandler;
}
