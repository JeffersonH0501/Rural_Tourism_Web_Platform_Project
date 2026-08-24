import React,{createContext,useContext,useEffect,useState} from 'react'; import {api} from '../api/client';
const AuthContext=createContext(null);
export function AuthProvider({children}){const [user,setUser]=useState(null);const [loading,setLoading]=useState(true);useEffect(()=>{api('/auth/session').then(setUser).catch(()=>setUser(null)).finally(()=>setLoading(false))},[]);const login=async credentials=>{const value=await api('/auth/login',{method:'POST',body:JSON.stringify(credentials)});setUser(value);return value};const logout=async()=>{await api('/auth/logout',{method:'POST'});setUser(null)};return <AuthContext.Provider value={{user,loading,login,logout,setUser}}>{children}</AuthContext.Provider>}
export const useAuth=()=>useContext(AuthContext);
