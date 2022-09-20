import React, { useContext } from "react";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import api from "@services/api";
import { Ticket } from "@types";
import { useRouter } from "next/router";
import { LoadingContext } from "@contexts/LoadingContext";
import TicketsTable from "@components/ticketsTable";

const Tickets: NextPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const { toggleLoading } = useContext(LoadingContext);


    const router = useRouter()
    const { id } = router.query

    const getTickets = async () => {
        toggleLoading(true);
        try {
            const { status, data } = await api.get("/tickets");
            if (status === 200) {
                setTickets(data.data)
                console.log(data.data)
            }
        } catch (err) {
            console.log(err);
            return;
        }
        toggleLoading(false);
    }

    useEffect(() => {
        getTickets();
    }, []);

    const data = [
        {
            key: "id",
            displayName: "ID",
        }, 
        {
            key: "title",
            displayName: "Title",
        }, 
        {
            key: "description",
            displayName: "Description",
        }, 
        {
            key: "company",
            displayName: "Company",
        }]

    return (
        <>
            <h1>{tickets.length > 0 && (tickets.length)} Tickets</h1>
            <TicketsTable tickets={tickets} data={data}/>
        </>
    );
};

export default Tickets;
