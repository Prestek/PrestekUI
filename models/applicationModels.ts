export interface ApplicationProps {
  filteredRequests: any[];
  showElevation?: boolean;
  limit?: number;
  role?: string;
  all?: boolean;
}

import { LoanRequest } from "@/hooks/const/data";

export interface RequestProps {
  request: LoanRequest | any;
  showElevation?: boolean;
  all?: boolean;
}

export interface RequestBankProps {
  request: LoanRequest;
  showElevation?: boolean;
}
