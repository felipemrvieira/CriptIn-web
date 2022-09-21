import React from "react";
import { useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import PageWrapper from "@components/pageWrapper";
import Card from "@components/card";
import { AuthContext } from "@contexts/AuthContext";
import styles from '../user.module.scss'
import Paper from '@mui/material/Paper';


interface InputData {
    email: string;
    password: string;
}

const Login: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputData>();

    const onSubmit: SubmitHandler<InputData> = async (data) => {
        setIsLoading(true);
        await signIn(data);
        setIsLoading(false);
    };

    return (
        <PageWrapper>
             <div className={styles.cardLogin}>

                <Paper elevation={1}>
                <Card >
                    <h1>Login Page</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            defaultValue={"felipemrvieira@gmail.com"}
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span>este campo é obrigatório</span>}

                        <input
                            defaultValue={"123123"}
                            {...register("password", { required: true })}
                        />
                        {errors.password && <span>este campo é obrigatório</span>}

                        <input type="submit" />
                    </form>
                </Card>
                </Paper>
             </div>
        </PageWrapper>
    );
};

export default Login;
