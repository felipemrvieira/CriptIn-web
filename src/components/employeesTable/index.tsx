import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { Ticket, User } from '@types';
import Link from "next/link";
import CurvedButton from "@components/curvedButton";
import { ReactNode } from 'react';
import styles from './ticketsTable.module.scss';

type Props = {
  employees: User[];
  data: Item[];
};

type Item = {
    key: string;
    displayName: string;
}

const EmployeesTable: React.FC<Props> = ({ employees, data = [
    {
        key: "id",
        displayName: "ID",
    }, 
    {
        key: "name",
        displayName: "Name",
    }, 
    {
        key: "email",
        displayName: "Email",
    }, 
    {
        key: "company",
        displayName: "Company",
    }] }: Props) => {

        console.log(employees)

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
                        {employees.map((row) => (
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
                                                    row[item.key as keyof User]?.name ?
                                                    // @ts-ignore
                                                    row[item.key as keyof User]?.name as ReactNode : 
                                                    row[item.key as keyof User] as ReactNode
                                                }
                                            </TableCell>);
                                    })
                                }
                                <TableCell>
                                    <Link key={row.id} href={`/users/${row.id}`}>
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

export default EmployeesTable;