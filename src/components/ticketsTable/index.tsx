import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { Ticket } from '@types';
import Link from "next/link";
import CurvedButton from "@components/curvedButton";
import { ReactNode } from 'react';
import styles from './ticketsTable.module.scss';

type Props = {
  tickets: Ticket[];
  data: Item[];
};

type Item = {
    key: string;
    displayName: string;
}

const TicketsTable: React.FC<Props> = ({ tickets, data = [
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
    }] }: Props) => {

    return (
        <>
            <TableContainer component={Paper} className={styles.table}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                data.map(item => {
                                    return (<TableCell key={item.displayName}>{item.displayName}</TableCell>);
                                })
                            }
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {
                                    data.map(item => {
                                        return (
                                            <TableCell key={item.key + new Date()}>
                                                {
                                                    // @ts-ignore
                                                    row[item.key as keyof Ticket]?.name ?
                                                    // @ts-ignore
                                                    row[item.key as keyof Ticket]?.name as ReactNode : 
                                                    row[item.key as keyof Ticket] as ReactNode
                                                }
                                            </TableCell>);
                                    })
                                }
                                <TableCell>
                                    <Link key={row.id} href={`/tickets/${row.id}`}>
                                        <a>
                                            <SearchIcon />
                                        </a>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
  
};

export default TicketsTable;