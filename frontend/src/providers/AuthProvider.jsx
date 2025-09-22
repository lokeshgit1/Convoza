import { createContext,useEffect } from "react";
import {useAuth}  from '@clerk/clerk-react'
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

const AuthContext = createContext({});

/**
 * React provider that installs an Axios request interceptor to attach a Clerk Bearer token to outgoing requests.
 *
 * The provider registers an interceptor (on mount) that calls Clerk's `getToken()` for each request and, if a token
 * is returned, sets the `Authorization: Bearer <token>` header. If token retrieval fails with an auth/missing-like
 * error, a user-facing toast is shown. The interceptor is removed on unmount.
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.children - React children to be rendered within the provider.
 * @returns {import('react').ReactElement} The provider element wrapping `children`.
 */
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