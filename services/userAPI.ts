import axios from "axios";

const API = "http://192.168.20.38:8080/api/users";

export async function getAllUsers() {
  const response = await axios.get(API);
  return response;
}

export async function checkUserExists(email: string) {
  try {
    const response = await axios.get(`${API}/email/${email}`);
    return response.status === 200;
  } catch (error) {
    console.error("Error checking user existence:", error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return false;
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
  console.log(API, userData);
  const response = await axios.post(API, userData);
  return response;
}
