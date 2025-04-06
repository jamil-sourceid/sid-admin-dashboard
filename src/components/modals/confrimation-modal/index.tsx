/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import "./style.css";

import { Modal, Checkbox } from "antd";
import { ConfirmationModalProps } from "./models";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  closeModal,
  loading,
  title,
  description,
  type,
  callBackBtnText,
  callback,
}) => {
  const chooseIcon = (): string => {
    switch (type) {
      case "delete":
        return "/assets/icons/deleteIcon.svg'";
      case "warning":
        return "/assets/icons/warningIcon.svg";
      default:
        return "/assets/icons/warningIcon.svg";
    }
  };

  const handleConfirm = (): void => {
    if (callback) {
      callback();
    }
  };

  return (
    <Modal
      open={open}
      centered
      className={`confirmation-modal ${type}`}
      footer={null}
    >
      <div>
        <div className="confirmation-modal-header">
          <div className="header-content">
            <img src={chooseIcon()} alt="" />
            <div className="modal-content">
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
        <div className="confirmation-modal-footer">
          <div className="footer-content">
            <Checkbox disabled>Don&apos;t show again</Checkbox>
            <div className="button-group">
              <button
                disabled={loading}
                className="btn-cancel"
                onClick={(): void => closeModal()}
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="btn-confirm"
                onClick={handleConfirm}
              >
                {callBackBtnText || "Yes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
