import Image from 'next/image';
import React, {useContext, useState} from 'react';
import styles from './header.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CurvedButton from '../curvedButton';
// import Link from 'next/link';
import { AuthContext } from '@contexts/AuthContext';
import MobileMenu from './mobileMenu';
import { useRouter } from "next/router";
import Link from '@components/link';
import NextLink from 'next/link';


const Header: React.FC = () => {
  const { isAuthenticated, signOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  
  const handleSignOutClick = () => {
      setIsLoading(true);
      signOut();
      setIsLoading(false);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }
    return (
      <>
        <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={handleMenuClick} />
        <header className={styles.header}>
          <div className={styles.logoContainer}>
            <Image
              src="/cryptin-logo.png"
              alt="CryptIn Logo"
              width={160.41}
              height={48.36}
              />
          </div>
            <>
              {isAuthenticated && (
                <nav className={styles.navAuth}>
                    <div>
                      <Link displayName='Dashboard' route='/dashboard' />
                    </div>
                    <div className={styles.menuActions}>
                      <a className={styles.menuAction} onClick={handleSignOutClick}>
                        <CurvedButton>
                          Sair
                        </CurvedButton>
                      </a>
                  </div>
                  <a className={styles.icon} onClick={handleMenuClick}>
                    <MenuIcon sx={{ fontSize: 52 }} />
                  </a>
                </nav>
              )}

              {!isAuthenticated && (
                <nav className={styles.navNoAuth}>
                  <div className={styles.menuActions}>
                    <NextLink href={"/user/auth"}>
                      <a className={styles.menuAction}>
                        <CurvedButton>
                          Entrar
                        </CurvedButton>
                      </a>
                    </NextLink>
                  </div>
                  <a className={styles.icon}>
                    <MenuIcon sx={{ fontSize: 52 }} onClick={handleMenuClick}/>
                  </a>
                </nav>
              )}
              
            </>
        </header>
      </>
    );
  
};

export default Header;