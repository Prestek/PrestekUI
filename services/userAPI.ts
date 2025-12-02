import { User, UserResponse } from "@/models/userModels";
import axios from "axios";

const API = "http://192.168.20.38:8080/api/users";

export async function getAllUsers() {
  const response = await axios.get(API);
  return response;
}

export async function getUserByEmail(email: string) {
  try {
    const response = await axios.get<UserResponse>(`${API}/email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error checking user existence:", error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function createUserProfile(userData: {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  documentNumber: string;
  phone: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  employmentStatus:
    | "Employed"
    | "Unemployed"
    | "Self-Employed"
    | "Student"
    | "Retired";
  creditScore: number;
}) {
  const response = await axios.post<UserResponse>(API, userData);
  return response.data;
}
