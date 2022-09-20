import { createContext, ReactNode, useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type LoadingContextData = {
    toggleLoading(loading: boolean): void;
};

type Props = {
    children: ReactNode;
};

export const LoadingContext = createContext({} as LoadingContextData);

export function LoadingProvider({ children }: Props) {
    const [isLoading, setIsLoading] = useState(false);
   
    const toggleLoading = (loading: boolean) => {
        setIsLoading(loading)
    }
    

    return (

        <LoadingContext.Provider value={{ toggleLoading }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </LoadingContext.Provider> 
    );
}