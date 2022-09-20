import React, { useContext } from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import api from "@services/api";
import { useRouter } from "next/router";
import { AuthContext } from "@contexts/AuthContext";
import { toast } from "react-toastify";

interface InputData {
    name: string;
    tax_number: string;
}

const NewCompany: NextPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputData>();

    const router = useRouter();
    const { user, isAuthenticated } = useContext(AuthContext);


    const registerRequest = async (inputData: InputData) => {
        try {
            const { status, data } = await api.post("/companies", {...inputData, user_id: user?.id});
            console.log(data)
            if (status === 201) {
                toast.success("Empresa criada com sucesso", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });                router.push({
                    pathname: "/companies",
                });
                return;
            }
        } catch (err: any) {
            toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(err.response.data.message);
            console.log(err.response.data.errors);
            return;
        }
    };

    const onSubmit: SubmitHandler<InputData> = async (data) => {
        registerRequest(data);
    };

    return (
        <>
            <h1>New Company</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    defaultValue={"StarFish"}
                    {...register("name", { required: true })}
                />
                {errors.name && <span>This field is required</span>}

                <input
                    defaultValue={"123.456.789-00"}
                    {...register("tax_number", { required: true })}
                />
                {errors.tax_number && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </>
    );
};

export default NewCompany;
