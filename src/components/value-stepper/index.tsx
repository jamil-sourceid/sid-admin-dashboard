"use client";

import React, { useState } from 'react';
import './style.css';
import { ValueStepperProps } from './models';

const ValueStepper: React.FC<ValueStepperProps> = ({
  step,
  max,
  initialValue = 0,
}) => {
  const [value, setValue] = useState<number>(initialValue);

  const handleIncrement = (): void => {
    setValue((prev) => Math.min(prev + step, max));
  };

  const handleDecrement = (): void => {
    setValue((prev) => Math.max(prev - step, 0)); // Ensure value doesn't go below 0
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = parseFloat(e.target.value);

    if (!isNaN(inputValue) && inputValue <= max && inputValue >= 0) {
      setValue(inputValue);
    } else if (e.target.value === '') {
      setValue(0); // Reset to 0 for empty inputs
    }
  };

  return (
    <div className="value-stepper-container">
      <button onClick={handleDecrement}>-</button>
      <input type="text" value={value} onChange={handleInputChange} />
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default ValueStepper;
