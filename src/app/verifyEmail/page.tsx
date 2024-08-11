"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';



export default function verifyEmail() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async() => {
      try{
        setError(false);
        const res = await fetch("/api/users/verifyemail", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token}),
        });
        const data = await res.json();
        if(data.success === false){
          console.log(data.message);
          return;
        }
        setVerified(true);
      }catch(error: any){
        setError(true);
        console.log(error.response.data);
      }
    }

    useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "");
    }, []);

    useEffect(() => {
      if(token.length > 0){
        verifyUserEmail();
      }
    }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500">{token ? `${token}` : "no token"}</h2>

      {verified && (
        <div className="">
          <h2 className="">Email Verified</h2>
          <Link href='/login'>
          <p className="text-blue-500">Login</p></Link>
        </div>
      )}

      {error && (
        <div className="">
          <h2 className="text-red-500">Error</h2>
        </div>
      )}
    </div>
  )
}
