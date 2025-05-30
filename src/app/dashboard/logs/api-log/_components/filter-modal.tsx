import React from "react";
import { Modal, Checkbox } from "antd";

interface SelectedFields {
  company: boolean;
  application: boolean;
  apiType: boolean;
  endpoint: boolean;
  status: boolean;
}

interface ExportFieldSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  selectedFields: SelectedFields;
  onFieldChange: React.Dispatch<React.SetStateAction<SelectedFields>>;
}

const ExportFieldSelectorModal: React.FC<ExportFieldSelectorModalProps> = ({
  visible,
  onClose,
  selectedFields,
  onFieldChange,
}) => {
  const handleCheckboxChange = (
    key: keyof SelectedFields,
    checked: boolean
  ) => {
    onFieldChange((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  return (
    <Modal
      title="Select Fields to Include"
      open={visible}
      onCancel={onClose}
      onOk={onClose}
      okText="Done"
      okButtonProps={{
        style: {
          backgroundColor: "#231e54",
          color: "#fff",
          borderColor: "#231e54",
        },
      }}
    >
      <div className="grid grid-cols-2">
        {(Object.keys(selectedFields) as (keyof SelectedFields)[]).map(
          (key) => (
            <Checkbox
              key={key}
              checked={selectedFields[key]}
              onChange={(e) => handleCheckboxChange(key, e.target.checked)}
              style={{ marginBottom: 8, textTransform: "capitalize" }}
            >
              {key}
            </Checkbox>
          )
        )}
      </div>
    </Modal>
  );
};

export default ExportFieldSelectorModal;
