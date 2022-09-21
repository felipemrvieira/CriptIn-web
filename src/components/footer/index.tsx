import Image from 'next/image';
import React from 'react';
import styles from './footer.module.scss';

const Footer: React.FC = () => {
  return <footer className={styles.footer}>
   
    <div className={styles.container}>
        <div >
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className={styles.logo}>
                    <Image
                        src="/cryptin-logo.png"
                        alt="CryptIn Logo"
                        width={120.72}
                        height={38.68}
                    />
                </span>
            </a>
        </div>
    </div>
</footer>
}

export default Footer;