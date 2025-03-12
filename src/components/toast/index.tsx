import React from 'react';
import './style.css';

import Close from '../../assets/icons/close.svg';

import { ToastContentProps } from 'react-toastify';

interface DataProps {
  title: string;
  text: string;
}

type CustomToastProps = ToastContentProps<DataProps>;

const Toast: React.FC<CustomToastProps> = ({ closeToast, data }) => {
  return (
    <div className="toast-container">
      <img
        src={Close}
        onClick={(): void => closeToast()}
        alt=""
        className="close-toast"
      />
      <div className="toast-content">
        <div className="toast-indicator" />
        <div className="toast-info">
          <h3>{data?.title}</h3>
          <p>{data?.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
