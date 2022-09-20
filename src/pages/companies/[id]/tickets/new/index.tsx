import React, { useContext } from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import api from "@services/api";
import { useRouter } from "next/router";
import { AuthContext } from "@contexts/AuthContext";
import { toast } from "react-toastify";

interface InputData {
    title: string;
    description: string;
}

const NewTicket: NextPage = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputData>();
    
    const router = useRouter();
    const { id } = router.query

    const { user, isAuthenticated } = useContext(AuthContext);

    const registerRequest = async (inputData: InputData) => {
        try {
            const { status, data } = await api.post("/tickets", {...inputData, company_id: id});
            console.log(data)
            if (status === 201) {
                toast.success("Ticket criada com sucesso", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });                
                
                router.push({
                    pathname: `/companies/${id}/tickets`,
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
            <h1>New Ticket</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    defaultValue={"new Ticket"}
                    {...register("title", { required: true })}
                />
                {errors.title && <span>This field is required</span>}

                <input
                    defaultValue={"this ticket is about to ..."}
                    {...register("description")}
                />

                <input type="submit" />
            </form>
        </>
    );
};

export default NewTicket;
