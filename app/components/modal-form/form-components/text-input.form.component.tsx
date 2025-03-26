import { Input } from 'antd';

export interface ModalFormTextInputProps {
  htmlFor: string;
  label: string;
  placeholder?: string;
  className?: string;
}

export const ModalFormTextInput = (props: ModalFormTextInputProps) => {
  return <Input className={props.className} />;
};
