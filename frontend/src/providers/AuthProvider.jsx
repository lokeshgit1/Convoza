import { createContext,useEffect } from "react";
import {useAuth}  from '@clerk/clerk-react'
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

const AuthContext = createContext({});

export default function AuthProvider({children}){
    const {getToken} = useAuth();
    useEffect(()=>{
        const interceptor = axiosInstance.interceptors.request.use(
            async(config)=>{
                try {
                    const token = await getToken({});
                    if(token){
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                } catch (error) {
                    if(error.message?.includes("auth") || error.message?.includes("missing")){
                        toast.error("Authentication Error. Please login again.");
                    }
                    console.log("Error fetching token:",error);
                }
                return config;
            },
            (error)=>{
                console.error("Request error:",error);
                return Promise.reject(error);
            }   
        )
         return() => axiosInstance.interceptors.request.eject(interceptor);

    },[getToken])

    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}