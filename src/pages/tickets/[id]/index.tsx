import React from "react";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import api from "@services/api";
import { Ticket, User } from "@types";
import { useRouter } from "next/router";

const Ticket: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

    const [ticket, setTicket] = useState<Ticket>();
    const getTicket = async () => {
        try {
            const { status, data } = await api.get(`/tickets/${id}`);
            if (status === 200) {
                setTicket(data.data)
            }
            console.log("data")
            console.log(data)
        } catch (err) {
            console.log(err);
            return;
        }
    }

    useEffect(() => {
        getTicket();
    }, [id]);

   

    return (
        <>
            <h1>Ticket {id}</h1>                    
            <p>{ticket?.status}</p>
            <p>{ticket?.title}</p>
            <p>{ticket?.description}</p>
            <p>{ticket?.created_by}</p>
            <p>tasks: {ticket?.tasks.length}</p>
        </>

    );
};

export default Ticket;
