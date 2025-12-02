export interface User{
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    documentNumber: string;
    phone: string;
    monthlyIncome: number;
    monthlyExpenses: number;
    employmentStatus: string;
    creditScore: number;
    createdAt: number[];
    updatedAt: number[];
}
export interface UserResponse {
    data: User;
    status: number;
    config: any;
    headers: any;
    request: any;
}