import Image from 'next/image';
import React, {useState} from 'react';
import styles from './card.module.scss';

type Props = {
  children: React.ReactNode;
};

const Card: React.FC<Props> = ({ children }: Props) => {

    return (
      <div className={styles.card}>
        {children}
      </div>
    );
  
};

export default Card;