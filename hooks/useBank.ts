import { useContext } from "react";
import { BankContext } from "./context/BankContext";

export function useBank() {
    const ctx = useContext(BankContext);
    if (!ctx) {
      throw new Error('useBank debe usarse dentro de un BankProvider');
    }
    return ctx;
  }