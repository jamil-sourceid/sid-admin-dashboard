export interface ConfirmationModalProps {
  open: boolean;
  title: string;
  description: string;
  type?: 'delete' | 'warning';
  loading?: boolean;
  callback?: () => void;
  callBackBtnText?: string;
  closeModal: () => void;
}
