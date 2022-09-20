import Image from 'next/image';
import React, {useState} from 'react';
import styles from './pageWrapper.module.scss';

type Props = {
  children: React.ReactNode;
};

const PageWrapper: React.FC<Props> = ({ children }: Props) => {

    return (
      <div className={styles.container}>
        {children}
      </div>
    );
  
};

export default PageWrapper;