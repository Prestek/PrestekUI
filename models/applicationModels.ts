export interface ApplicationProps extends ChildrenProps {
  total: number;
}

import { LoanRequest } from "@/hooks/const/data";
import { ChildrenProps } from "./childrenModel";

export interface RequestProps {
  request: LoanRequest | any;
  showElevation?: boolean;
}

export interface RequestBankProps {
  request: LoanRequest;
  showElevation?: boolean;
}
