import { useContext } from "react";
import { ApplicationsContext } from "./context/ApplicationsContext";

export function useApplications() {
    const ctx = useContext(ApplicationsContext);
    if (!ctx) {
      throw new Error('useApplications debe usarse dentro de un ApplicationsProvider');
    }
    return ctx;
  }