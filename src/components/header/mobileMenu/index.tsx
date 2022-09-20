import Image from 'next/image';
import React, {useContext, useState} from 'react';
import styles from './mobileMenu.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';import CurvedButton from '../../curvedButton';
import Link from 'next/link';
import { AuthContext } from '@contexts/AuthContext';
import Dialog from '@mui/material/Dialog';

type Props = {
    isMenuOpen: boolean
    setIsMenuOpen: (arg:boolean) => void;
} 

const MobileMenu: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
    const { isAuthenticated, signOut } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSignOutClick = () => {
      setIsLoading(true);
      signOut();
      setIsLoading(false);
    };

    const handleCloseClick = () => {
        setIsMenuOpen(false)
    }

    return (
        <Dialog
        fullScreen
        open={isMenuOpen}
        onClose={handleCloseClick}
        // TransitionComponent={Transition}
      >
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Image
                    src="/zservices-logo.png"
                    alt="Z Services Logo"
                    width={168.41}
                    height={48.36}
                />
            </div>
            <a className={styles.icon} onClick={handleCloseClick}>
                <CloseIcon sx={{ fontSize: 52 }} />
            </a>
        </header>

        <>
            {isMenuOpen && (
            <nav className={styles.navAuth} onClick={handleCloseClick}>
                <div >
                    <Link href={`/companies`}>
                        <a className={styles.active}>Empresas</a>
                    </Link>
                    <Link href={`/tickets`}>
                        <a>Tickets</a>
                    </Link>
                    <Link href={`/users`}>
                        <a>Usuários</a>
                    </Link>
                </div>
                <div className={styles.menuActions}>
                    <div className={styles.menuAction}><SearchIcon sx={{ fontSize: 32 }} /></div>
                    {isAuthenticated ? (

                        <a className={styles.menuAction} onClick={handleSignOutClick}>
                            <CurvedButton>
                                Sair
                            </CurvedButton>
                        </a>
                    ):
                    (
                        <Link href={"/user/auth"}>
                            <a className={styles.menuAction}>
                                <CurvedButton>
                                    Entrar
                                </CurvedButton>
                            </a>
                        </Link>
                    )}
                </div>
            </nav>
            )}
        
        </>
      </Dialog>
    );
  
};

export default MobileMenu;

