import { User, UserResponse } from "@/models/userModels";
import axios from "axios";
import { createAuthHeaders } from "./token";
import { useRouter } from "expo-router";

const API = "https://people.eci-pigball.online/api/users";

export async function getAllUsers(token: string): Promise<any> {
  const response = await axios.get<User[]>(API, createAuthHeaders(token));
  return response;
}

export async function getUserByEmail(email: string,token: string) {
  try {
    const response = await axios.get(`${API}/email/${email}`, createAuthHeaders(token));
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
},token: string) {
  console.log(userData);
  const response = await axios.post(API, userData, createAuthHeaders(token));
  return response.data;
}


export async function getUserById(userId: string,token: string) {
  const response = await axios.get(`${API}/${userId}`, createAuthHeaders(token));
  return response.data;
}

export async function updateUserProfile(userId: number, userData: User, token: string) {
  const response = await axios.put(`${API}/${userId}`, userData, createAuthHeaders(token));
  return response.data;
}

