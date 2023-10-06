// CourtCreationModal.js

import React from 'react';
import styles from '../../styles/CourtCreationModal.module.css';  // Define your modal styles

const CourtCreationModal = ({ closeModal }) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span>Court Creation Successful!</span>
        </div>
        <div className={styles.modalBody}>
          <p>Your court has been created successfully.</p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={closeModal} className={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourtCreationModal;
