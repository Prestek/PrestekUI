import axios from "axios";
import { createAuthHeaders } from "./token";
import { LoanRequestOffer } from "@/models/creditModels";

const API = "https://prestek.app.n8n.cloud/webhook/create-application";
export async function createLoan(loan: LoanRequestOffer, token: string){
    console.log("Creating loan:", loan);
    console.log("Token:", token);
    const response = await axios.post(API, loan, createAuthHeaders(token));
    console.log("Response:", response.data);
    return response;
}