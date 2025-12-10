import { Simulation, UpdateApplicationRequest } from "@/models/creditModels";
import axios from "axios";
import { createAuthHeaders, createAuthHeadersWithBankCode } from "./token";
import { BankCode } from "@/models/enums/Request";

const API = "https://financial-entity.eci-pigball.online/api/";



export async function getApplicationsByUser(userId: string, token: string) {
    const response = await axios.get(`${API}applications/user/${userId}`, createAuthHeaders(token));
    console.log("Applications:", response.data);
    return response;
}

export async function simulateLoan(simulation: Simulation, token: string) {
    const response = await axios.post(`${API}simulation`, simulation, createAuthHeaders(token));
    return response;
}

export async function getApplication(applicationId: string, bankCode: BankCode, token: string) {
    
    console.log("Getting application:", applicationId, bankCode, token);
    const response = await axios.get(`${API}applications/${applicationId}`, createAuthHeadersWithBankCode(token, bankCode));
    console.log("Application:", response.data);
    return response;
}

export async function getApplicationsByBank(token: string, bankCode: BankCode) {
    console.log(bankCode)
    const response = await axios.get(`${API}applications`, createAuthHeadersWithBankCode(token, bankCode));
    return response;
}

export async function updateApplication(applicationId: number, bankCode: BankCode, application: UpdateApplicationRequest, token: string) {
    console.log("Updating application:", applicationId, bankCode, application, token);
    const response = await axios.patch(`${API}applications/${applicationId}/status`, application, createAuthHeadersWithBankCode(token, bankCode));
    return response;
}


