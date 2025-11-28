export interface ApplicationProps {
  filteredRequests: any[];
  showElevation?: boolean;
  limit?: number;
  role?: string;
}

import { LoanRequest } from "@/hooks/const/data";

export interface RequestProps {
  request: LoanRequest | any;
  showElevation?: boolean;
}

export interface RequestBankProps {
  request: LoanRequest;
  showElevation?: boolean;
}
