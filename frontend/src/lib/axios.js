

    import axios from "axios";
import { Import } from "lucide-react";

    const BASE_URL = import.meta.env.VITE_API_BASE_URL

    export const axiosInstance = axios.create({
        baseURL: BASE_URL,
        withCredentials: true,
    });