import React, { useContext } from "react";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import api from "@services/api";
import { Account, User, Wallet } from "@types";
import Link from "next/link";
import CurvedButton from "@components/curvedButton";
import { LoadingContext } from "@contexts/LoadingContext";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './companies.module.scss';



const Dashboard: NextPage = () => {

    const [user, setUser] = useState<User>(); 
    const [account, setAccount] = useState<Account>(); 
    const [wallets, setWallets] = useState<Wallet[]>([]); 
    const { toggleLoading } = useContext(LoadingContext);

    const getInfo = async () => {
        toggleLoading(true);
        try {
            const { status, data } = await api.get("/dashboard");
            if (status === 200) {
                setUser(data.data.user)
                setAccount(data.data.account)
                setWallets(data.data.wallets)
            }
        } catch (err) {
            console.log(err);
            toggleLoading(false);
            return;
        }
        toggleLoading(false);
    }

    useEffect(() => {
        getInfo();
    }, []);


    return (
        <>
            <h1>User</h1>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                ID: {user?.id}
            </Typography>
            <Typography variant="h5" sx={{ mb: 5.5 }} component="div">
                Nome: {user?.name}
            </Typography>


            <h2>Carteiras</h2>
            <div className={styles.companiesContainer}>

                {wallets && wallets.map((wallet) => (
                    <Link key={wallet.id} href={`/wallets/${wallet.id}`} >
                        <a>
                            <Card sx={{ minWidth: 275 }} className={styles.card}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        ID: {wallet.id}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        QTD Moedas: {wallet?.how_many_coins}
                                    </Typography>

                                    {wallet?.coins.map((coin:any) => (
                                        <div key={coin.coin}>
                                            <Typography  sx={{ mt: 1.5 }} color="text.secondary">
                                                Moeda: {coin.coin}
                                            </Typography>
                                            <Typography   color="text.secondary">
                                                Símbolo: {coin.acronym}
                                            </Typography>
                                            <Typography  sx={{ mb: 1.5 }} color="text.secondary">
                                                Saldo: {coin.balance}
                                            </Typography>
                                        </div>
                                        
                                    ))}
                                </CardContent>
                                
                            </Card>
                        </a>
                    </Link>
                ))}
            </div>

           
        </>

    );
};

export default Dashboard;
