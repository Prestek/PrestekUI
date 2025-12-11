export interface ApplicationProps extends ChildrenProps {
  total: number;
}

import { ChildrenProps } from "./childrenModel";
import { Application } from "./creditModels";
import { BankCode } from "./enums/Request";

export interface RequestProps {
  request: Application;
  showElevation?: boolean;
}

export interface RequestBankProps {
  request: Application;
  showElevation?: boolean;
  bankCode: BankCode | null;
}
