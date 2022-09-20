import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import styles from "../styles/Home.module.scss";
import PageWrapper from "@components/pageWrapper";
import { AuthContext } from "@contexts/AuthContext";

const Home: NextPage = () => {
    const { user, isAuthenticated } = useContext(AuthContext);

    return (
        <PageWrapper>
            <Head>
                <title>Z Services</title>
                <meta
                    name="description"
                    content="Z Services"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <p className={styles.title}>{isAuthenticated ? `Welcome to Z-Services ${user?.email}` : "Not logged in"}</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo voluptates doloremque, earum dolores porro expedita! Debitis quia quam repudiandae tenetur porro nisi aut impedit, aliquid sunt tempora sit molestiae itaque.</p>
            </main>
        </PageWrapper>
    );
};

export default Home;
