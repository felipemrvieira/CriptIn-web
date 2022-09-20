import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import api from "@services/api";
import { useRouter } from "next/router";
import PageWrapper from "@components/pageWrapper";
import { toast } from "react-toastify";
import Card from "@components/card";

interface InputData {
    name: string;
    email: string;
    password: string;
}

const NewUser: NextPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputData>();
    const router = useRouter();

    const registerRequest = async (inputData: InputData) => {
        try {
            const { status, data } = await api.post("/register", inputData);
            if (status === 201) {
                toast.success('Usuário criado com sucesso', {
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
                return;
            }
        } catch (err) {
            toast.error('Erro ao criar usuário', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(err);
            return;
        }
    };

    const onSubmit: SubmitHandler<InputData> = async (data) => {
        registerRequest(data);
    };

    return (
        <PageWrapper>
            <Card>
                <h1>New User</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        defaultValue={"felipemrvieira@gmail.com"}
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span>This field is required</span>}

                    <input
                        defaultValue={"Teste@123"}
                        {...register("password", { required: true })}
                    />
                    {errors.password && <span>This field is required</span>}

                    <input
                        defaultValue={"Felipe"}
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span>This field is required</span>}

                    <input type="submit" />
                </form>
            </Card>
        </PageWrapper>
    );
};

export default NewUser;
