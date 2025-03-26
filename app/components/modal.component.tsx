import { Modal as AntModal, Divider } from 'antd';

interface ModalProps {
  width?: string;
  children: React.ReactNode;
  title: string;
  open: boolean;
  onCancel?: () => void;
}

export const Modal = (props: ModalProps) => {
  return (
    <AntModal
      open={props.open}
      title={props.title}
      okText="Create"
      width={props.width}
      onCancel={props.onCancel}
      okButtonProps={{ form: 'createConstructor', htmlType: 'submit' }}
    >
      <Divider />
      <div className="mt-6">{props.children}</div>
    </AntModal>
  );
};
