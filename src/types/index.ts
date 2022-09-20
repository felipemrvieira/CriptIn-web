export type Company = {
    id: number;
    name: string;
    tax_number: string;
    created_at: Date;
    employees_count: number;
}

export type Role = {
    id: number;
    name: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    roles: Role[];
    companies: Company[];
};

export type Task = {
    id: number;
};

export type Ticket = {
    id: number;
    title: string;
    description: string;
    company: Company;
    created_by: string;
    status: string;
    tasks: Task[];
};