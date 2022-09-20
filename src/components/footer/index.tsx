import Image from 'next/image';
import React from 'react';
import styles from './footer.module.scss';

const Footer: React.FC = () => {
  return <footer className={styles.footer}>
    <div className={styles.menu}>
        <div>menu</div>
        <div>menu</div>
        <div>menu</div>
    </div>
    <div className={styles.divider}/>    
    <div className={styles.container}>
        <div className={styles.appButtons}>
            <div className={styles.imageContainer}>
                <Image
                    className={styles.image}
                    src="/apple_store.png"
                    alt="App Store"
                    layout="responsive"
                    width={200}
                    height={60}
                />
            </div>
            <div className={styles.imageContainer}>
                <Image
                    className={styles.image}
                    src="/google_play.png"
                    alt="Google Play"
                    layout="responsive" 
                    width={200}
                    height={60}
                />
            </div>
        </div>
        <div className={styles.copyright}>Lorem ipsum dolor sit amet consectetur adipisicing elit</div>
        <div >
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className={styles.logo}>
                    <Image
                        src="/zservices-logo.png"
                        alt="Z Services Logo"
                        width={132.72}
                        height={38.68}
                    />
                </span>
            </a>
        </div>
    </div>
</footer>
}

export default Footer;