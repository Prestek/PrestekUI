import axios from "axios";
import { createAuthHeaders } from "./token";
import { LoanRequestOffer } from "@/models/creditModels";

const API = "http://52.45.159.103:5678/webhook/create-application";
export async function createLoan(loan: LoanRequestOffer, token: string){
    console.log("Creating loan:", loan);
    console.log("Token:", token);
    const response = await axios.post(API, loan, createAuthHeaders(token));
    console.log("Response:", response.data);
    return response;
}