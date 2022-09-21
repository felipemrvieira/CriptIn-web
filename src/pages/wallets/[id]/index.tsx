import React, { useContext } from "react";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import api from "@services/api";
import { User } from "@types";
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
    const [account, setAccount] = useState([]); 
    const [wallets, setWallets] = useState([]); 
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
            <h1>Wallet</h1>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                ID: {user?.id}
            </Typography>
            <Typography variant="h5" sx={{ mb: 5.5 }} component="div">
                Nome: {user?.name}
            </Typography>

            <Link href={"/dashboard"}>
                <a>
                    <CurvedButton>
                        Nova Carteira
                    </CurvedButton>
                </a>
            </Link>
        </>

    );
};

export default Dashboard;
