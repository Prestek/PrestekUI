import { User } from "@/models/userModels";
import { getItem } from "expo-secure-store";
import { useEffect, useState } from "react";

export const useUserExists = () => {
    const[isChecking, setIsChecking] = useState(true);
    const[user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const checkUserExists = async () => {
            setIsChecking(true);
            const storedUser = await getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser) as User;
                setUser(parsedUser);
            } else {
                console.log("No hay usuario guardado");
            }
            setIsChecking(false);
        }
        checkUserExists();
    }, []);
    return { isChecking, user };
}