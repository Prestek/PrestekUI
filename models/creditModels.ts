export interface CreditProps{
    loan: {
        bank: string,
        totalAmount: number,
        interestRate: number,
        startDate: string,
        endDate: string,
        paidAmount: number,
        remainingAmount: number,
        progressPercentage: number
    }
}


export interface Loan {
    bank: string,
    totalAmount: number,
    interestRate: number,
    startDate: string,
    endDate: string,
    paidAmount: number,
    remainingAmount: number,
    progressPercentage: number
}

export interface NextPaymentProps {
    nextPaymentDate: string;
    nextPaymentAmount: number;
    paymentDateLabel: string;
}