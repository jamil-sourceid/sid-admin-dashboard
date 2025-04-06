"use client";

import React, { useEffect, useState } from 'react';
import './style.css';

import { Modal } from 'antd';

interface IdleModalProps {
  open: boolean;
  continueBtnAction: () => void;
  logoutBtnAction: () => void;
}

const IdleModal: React.FC<IdleModalProps> = ({
  open,
  continueBtnAction,
  logoutBtnAction,
}) => {
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    let countdownInterval: number | undefined;

    if (open) {
      // Start countdown when modal is opened
      countdownInterval = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            logoutBtnAction(); // Log out user after countdown finishes
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      // Clear countdown interval when modal is closed
      clearInterval(countdownInterval);
      setCountdown(120); // Reset countdown when modal is reopened
    };
  }, [open, logoutBtnAction]);

  return (
    <Modal open={open} centered className="idle-modal" footer={null}>
      <div>
        <div className="idle-modal-header">
          <div className="header-content">
            <div className="modal-content">
              <h2>You will be logged out soon!</h2>
              <p>
                For your security, we log you out automatically when you have
                not been active for a certain period of time.
              </p>
              <h1>
                {Math.floor(countdown / 60)}:
                {String(countdown % 60).padStart(2, '0')}
              </h1>
            </div>
          </div>
        </div>
        <div className="idle-modal-footer">
          <div className="footer-content">
            <div className="button-group">
              <button
                className="btn-cancel"
                onClick={(): void => logoutBtnAction()}
              >
                Log out now
              </button>
              <button
                className="btn-confirm"
                onClick={(): void => continueBtnAction()}
              >
                Continue session
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default IdleModal;
