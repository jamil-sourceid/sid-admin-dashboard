"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

// Button component for Zendesk support
const SupportButton = () => {
  const [isActive, setIsActive] = useState(false);

  const handleSupportClick = () => {
    // Toggle the active state for animation
    setIsActive(!isActive);
  };

  return (
    <button
      className={`${styles.supportButton} ${isActive ? styles.active : ''}`}
      onClick={handleSupportClick}
      aria-label="Get support"
    >
      <Image 
        src="/assets/icons/support.svg"
        alt="Support"
        width={20}
        height={20}
      />
      <span className={styles.supportText}>Support</span>
    </button>
  );
};

export default SupportButton; 