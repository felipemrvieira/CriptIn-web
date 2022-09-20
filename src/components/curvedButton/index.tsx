import Image from 'next/image';
import React, {useState} from 'react';
import styles from './button.module.scss';

type Props = {
  children: React.ReactNode;
};

const CurvedButton: React.FC<Props> = ({ children }: Props) => {

    return (
      <button className={styles.button}>
        {children}
      </button>
    );
  
};

export default CurvedButton;