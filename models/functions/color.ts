import { LoanRequestStatus } from "../enums/Request";

export const getColorByStatus = (status: LoanRequestStatus) => {
    switch (status) {
        case LoanRequestStatus.PENDING:
            return 'rgb(124, 108, 18)';
        case LoanRequestStatus.REJECTED:
            return 'rgb(127, 29, 29)';
        default:
            return 'rgb(20, 83, 45)';
    }
}

export const getBackgroundColorByStatus = (status: string) => {
    switch (status) {
        case LoanRequestStatus.PENDING:
            return 'rgba(249, 207, 22, 0.18)';
        case LoanRequestStatus.REJECTED:
            return 'rgba(239, 68, 68, 0.15)';
        default:
            return 'rgba(28, 196, 90, 0.18)';
    }
}