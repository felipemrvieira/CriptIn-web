import React, { useContext } from "react";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import api from "@services/api";
import { Company, User } from "@types";
import Link from "next/link";
import CurvedButton from "@components/curvedButton";
import { useRouter } from "next/router";
import { LoadingContext } from "@contexts/LoadingContext";

const Users: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { toggleLoading } = useContext(LoadingContext);


    const [users, setUsers] = useState<User[]>([]); 
    const getUsers = async () => {
        toggleLoading(true);
        try {
            const { status, data } = await api.get("/users");
            if (status === 200) {
                setUsers(data.data)
            }
        } catch (err) {
            console.log(err);
            return;
        }
        toggleLoading(false);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <h1>Users</h1>
            {users.map((user) => (
                <Link key={user.id} href={`/companies/${user.id}`}>
                    <a>
                        <div >{user.email}</div>
                    </a>
                </Link>
            ))}

            <Link href={`/user/new`}>
                <a>
                    <CurvedButton>
                        Novo usuário
                    </CurvedButton>
                </a>
            </Link>
        </>

    );
};

export default Users;
