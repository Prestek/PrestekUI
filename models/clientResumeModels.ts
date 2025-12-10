export interface LastApplicationProps{
    bank: string;
    totalAmount: number;
    applicationDate: string;
}

export interface CreditProps{
    lastApplication: LastApplicationProps;
}