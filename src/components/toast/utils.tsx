import React from 'react';
import { toast, Id } from 'react-toastify';
import Toast from '.';

interface DataProps {
  title: string;
  text: string;
}

// ? type can be either of the 3: 'success', 'error', 'warning'

export const notify = (data: DataProps, type: string): string | Id | void =>
  toast((props) => <Toast {...props} data={data} />, {
    closeButton: false,
    className: `toast ${type}`,
    autoClose: 5000,
    hideProgressBar: true,
  });
