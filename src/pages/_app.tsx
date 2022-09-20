import "../styles/globals.scss";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Header from "@components/header";
import Footer from "@components/footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@contexts/AuthContext";
import PageWrapper from "@components/pageWrapper";
import { LoadingProvider } from "@contexts/LoadingContext";


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="body">
            <LoadingProvider>  
                <AuthProvider>  
                    <Header />
                    <PageWrapper>
                        <Component {...pageProps} />
                    </PageWrapper>
                    <Footer />
                    <ToastContainer />
                </AuthProvider>
            </LoadingProvider>
        </div>
    );
}

export default dynamic(() => Promise.resolve(MyApp), {
    ssr: false,
});
