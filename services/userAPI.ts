import axios from "axios";

const API = "http://localhost:8080/api/users/";

export async function getAllUsers() {
    const response = await axios.get(API);
    return response;
}