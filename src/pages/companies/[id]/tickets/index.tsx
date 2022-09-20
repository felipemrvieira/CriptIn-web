import React from "react";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import api from "@services/api";
import { Company, Ticket } from "@types";
import Link from "next/link";
import CurvedButton from "@components/curvedButton";
import { useRouter } from "next/router";
import TicketsTable from "@components/ticketsTable";

const Tickets: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
   
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const getCompany = async () => {
        try {
            const { status, data } = await api.get(`/companies/${id}`);
            if (status === 200) {
                setTickets(data.data.tickets)
            }
            console.log("data")
            console.log(data)
        } catch (err) {
            console.log(err);
            return;
        }
    }

    useEffect(() => {
        getCompany();
    }, [id]);

    const data = [
        {
            key: "id",
            displayName: "ID",
        }, 
        {
            key: "title",
            displayName: "Title",
        }, 
       
    ]

    return (
        <>
            <h1>Tickets da empresa {id}</h1>
            <TicketsTable tickets={tickets} data={data}/>

            <Link href={`/companies/${id}/tickets/new`}>
                <a>
                    <CurvedButton>
                        Novo Ticket
                    </CurvedButton>
                </a>
            </Link>
        </>

    );
};

export default Tickets;
