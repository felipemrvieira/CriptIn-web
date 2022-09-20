import React from "react";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import api from "@services/api";
import { Company, Ticket, User } from "@types";
import Link from "next/link";
import CurvedButton from "@components/curvedButton";
import { useRouter } from "next/router";
import TicketsTable from "@components/ticketsTable";
import EmployeesTable from "@components/employeesTable";

const Company: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

    const [company, setCompany] = useState<Company>();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [employees, setEmployees] = useState<User[]>([]);
    const getCompany = async () => {
        try {
            const { status, data } = await api.get(`/companies/${id}`);
            if (status === 200) {
                setCompany(data.data)
                setTickets(data.data.tickets)
                setEmployees(data.data.employees)
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

    const ticketsData = [
        {
            key: "id",
            displayName: "ID",
        }, 
        {
            key: "title",
            displayName: "Title",
        },
    ]
  
    const employeesData = [
        {
            key: "id",
            displayName: "ID",
        }, 
        {
            key: "name",
            displayName: "Name",
        },
       
    ]

   

    return (
        <>
            <h1>Companies {id}</h1>  
            <div >{company?.name}</div>
                  

            <hr />
            
            <h2>Tickets</h2>
            <TicketsTable tickets={tickets} data={ticketsData}/>

            <Link href={`/companies/${id}/tickets/new`}>
                <a>
                    <CurvedButton>
                        Novo Ticket
                    </CurvedButton>
                </a>
            </Link>

            <hr />

            <h2>Users</h2>
            <EmployeesTable employees={employees} data={employeesData} />
           
            <Link href={`/companies/${id}/employees/new`}>
                <a>
                    <CurvedButton>
                        Novo User
                    </CurvedButton>
                </a>
            </Link>



        </>

    );
};

export default Company;
