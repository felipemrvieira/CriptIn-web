

export type User = {
    id: number;
    name: string;
    email: string;
};

export type Account = {
    id: number;
    user_id: number;
    balance: number;
};

export type Coin = {
    id: number;
    name: string;
    acronym: string;
    balance: string;
};

export type Wallet = {
    id: number;
    how_many_coins: number;
    account_id: number;
    coins: Coin[];
};

