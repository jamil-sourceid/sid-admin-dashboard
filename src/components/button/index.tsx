/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import './style.css';

interface ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  btnClass?: string;
  btnType?: 'button' | 'submit' | 'reset';
  btnTxt: string;
  btnLoadingTxt?: string;
  btnClick?: () => void;
  icon?: string;
}

const SourceIdButton: React.FC<ButtonProps> = ({
  loading,
  disabled,
  btnClass,
  btnTxt,
  btnType,
  btnLoadingTxt,
  btnClick,
  icon,
}) => {
  return (
    <button
      className={`source-id-button ${btnClass}`}
      disabled={disabled || loading || false}
      type={btnType || 'button'}
      onClick={btnClick}
    >
      {loading && (
        <div className="button-loader">
          <div className="spinner"></div>
        </div>
      )}
      {icon && !loading && <img className="icon" src={icon} alt="icon" />}
      {loading && btnLoadingTxt ? btnLoadingTxt : btnTxt}
    </button>
  );
};

export default SourceIdButton;
