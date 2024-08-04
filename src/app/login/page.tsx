"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signin() {
 
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onLogin = async () => {
    try{
      setLoading(true);
      // const res = await axios.post("/api/users/login", user);

      const res = await fetch("/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if(data.success === false){
        console.log("error: ", data.message);
      }
      console.log("login success: ", data);
      toast.success("Login success");
      router.push("/profile");
    }catch(error: any){
      console.log("login error: ", error.message);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0)
    {
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="">{loading? 'Processing...' : 'Login'}</h1>
        <hr />
        <label htmlFor="email">email:</label>
        <input id="email" type="email" onChange={(e) => setUser({...user, email: e.target.value})} value={user.email} placeholder="email" className="px-4 py-2 border border-black"/>
        <label htmlFor="password">password</label>
        <input id="password" type="password" onChange={(e) => setUser({...user, password: e.target.value})} value={user.password} placeholder="password" className="px-4 py-2 border border-black"/>
        <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login</button>
        <Link href='/signup'>Dont have an account</Link>
    </div>
  )
}
