import React, { useContext } from "react";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import api from "@services/api";
import { Company } from "@types";
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



const Companies: NextPage = () => {

    const [companies, setCompanies] = useState<Company[]>([]); 
    const { toggleLoading } = useContext(LoadingContext);

    const getCompanies = async () => {
        toggleLoading(true);
        try {
            const { status, data } = await api.get("/companies");
            if (status === 200) {
                setCompanies(data.data)
            }
        } catch (err) {
            console.log(err);
            return;
        }
        toggleLoading(false);
    }

    useEffect(() => {
        getCompanies();
    }, []);

    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );

    return (
        <>
            <h1>Companies</h1>
            <div className={styles.companiesContainer}>

                {companies.map((company) => (
                    <Link key={company.id} href={`/companies/${company.id}`} >
                        <a>
                            <Card sx={{ minWidth: 275 }} className={styles.card}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Identification: {company.id}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {company.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Tax number: {company.tax_number}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <a >Learn More</a>
                                </CardActions>
                            </Card>
                        </a>
                    </Link>
                ))}
            </div>

            <Link href={"/companies/new"}>
                <a>
                    <CurvedButton>
                        Nova empresa
                    </CurvedButton>
                </a>
            </Link>
        </>

    );
};

export default Companies;
