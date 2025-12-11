import { ChildrenProps } from "@/models/childrenModel";
import { Application } from "@/models/creditModels";
import { getApplicationsByUser } from "@/services/financialAPI";
import { useAuth } from "@clerk/clerk-expo";
import React, { createContext, useMemo, useState } from "react";

type ApplicationsContextType = {
  applications: Application[];
  isLoading: boolean;
  loadApplications: (userId: string) => Promise<void>;
  addApplication: (newApplication: Application) => void;
  replaceAllApplications: (list: Application[]) => void;
  getLastApplication: () => Application | null;
};

export const ApplicationsContext = createContext<
  ApplicationsContextType | undefined
>(undefined);

// Convierte fecha (string o array) a timestamp para ordenar
const dateToTimestamp = (date: string | number[] | undefined): number => {
  if (!date) return 0;
  if (typeof date === "string") {
    return new Date(date).getTime();
  }
  if (Array.isArray(date)) {
    // Array: [year, month, day, hour, minute, second, nanoseconds]
    return new Date(
      date[0],
      date[1] - 1,
      date[2],
      date[3] || 0,
      date[4] || 0,
      date[5] || 0
    ).getTime();
  }
  return 0;
};

export const ApplicationsProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();
  const loadApplications = async (userId: string) => {
    setIsLoading(true);
    try {
      const token = await getToken({ template: "prestek-api" });
      if (!token) {
        throw new Error("No authentication token");
      }
      const response = await getApplicationsByUser(userId, token);
      const orderedApplications = response.data.sort(
        (a: Application, b: Application) => {
          const dateA = dateToTimestamp(a.applicationDate);
          const dateB = dateToTimestamp(b.applicationDate);
          return dateB - dateA;
        }
      );
      console.log("Ordered Applications:", orderedApplications);
      setApplications(orderedApplications);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addApplication = (newApplication: Application) => {
    setApplications([newApplication, ...applications]);
  };
  const replaceAllApplications = (list: Application[]) => {
    setApplications(list);
  };
  const getLastApplication = () => {
    return applications.length > 0 ? applications[0] : null;
  };

  return (
    <ApplicationsContext.Provider
      value={useMemo(
        () => ({
          applications,
          isLoading,
          loadApplications,
          addApplication,
          replaceAllApplications,
          getLastApplication,
        }),
        [applications, isLoading]
      )}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};
