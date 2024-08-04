"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const[loading, setLoading] = useState(false);

  const router = useRouter();

  const onSignup = async () => {
    try{
      setLoading(true);
      // using axios
      // const res = await axios.post("/api/users/signup", user);
      // console.log("response data ", res.data);

      // using fetch method
      const res = await fetch("/api/users/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      const data = await res.json();
      if(data.success === false){
        console.log("error: ", data.message);
      }
      console.log("response", data);
      router.push("/login");
    }catch(error: any){
      console.log("Singup failed", error.message);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="">{loading? 'Processing...' : 'Signup'}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input id="username" type="text" onChange={(e) => setUser({...user, username: e.target.value})} value={user.username} placeholder="username" className="px-4 py-2 border border-black"/>
        <label htmlFor="email">email:</label>
        <input id="email" type="email" onChange={(e) => setUser({...user, email: e.target.value})} value={user.email} placeholder="email" className="px-4 py-2 border border-black"/>
        <label htmlFor="password">password</label>
        <input id="password" type="password" onChange={(e) => setUser({...user, password: e.target.value})} value={user.password} placeholder="password" className="px-4 py-2 border border-black"/>
        <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled? 'No Signup' : 'Signup'}</button>
        <Link href='/login'>Already have an account</Link>
    </div>
  )
}
