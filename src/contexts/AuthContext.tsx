import { createContext, ReactNode, useEffect, useState } from "react";
import api from "@services/api";
import { useRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { toast } from "react-toastify";
import { User } from "@types";

type SignInCredentials = {
    email: string;
    password: string;
};

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): Promise<void>;
    isAuthenticated: boolean;
    user: User | null | undefined;
};

type Props = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;
    const router = useRouter();

    async function getUserData() {
        const {'z-services-token': token} = parseCookies();

        if (token) {
            api.get('/profile').then(response => {
                console.log(response.data);
                setUser(response.data.data);
            });
        }
    }

    useEffect(() => {
        getUserData();
    } , []);

    async function signIn({ email, password }: SignInCredentials) {
        try {

            const { status, data } = await api.post("/login", {email, password});

            if (status === 200) {
                toast.success('Usuário logado com sucesso', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setCookie(undefined, 'z-services-token', data.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/'
                });

                getUserData();

                router.push({
                    pathname: "/companies",
                });
            }

        } catch (err:any) {
            const errorMessage: string = err.response.data.message

            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            console.log(err);
        }
    }
    async function signOut() {
        try {

           await api.delete("/logout");

            destroyCookie(undefined, 'z-services-token', {
                path: '/'
            });
            
            toast.success('Usuário deslogado com sucesso', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            router.push({
                pathname: "/",
            });

            setUser(undefined);
            

        } catch (err) {
            console.log(err);
        }
    }



    return (

        <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider> 
    );
}