"use client";
import React from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Profile() {

  const router = useRouter();

  const logout = async () => {
    try{
      const res = await fetch("/api/users/logout");
      const data = await res.json();
      if(data.success === false){
        console.log("logoutError: ", data.message);
      }
      console.log(data);
      router.push("/");
    }catch(error: any){
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className="">Profile page</h1>
        <p>Pofile</p>
        <button onClick={logout} className="">Logout</button>
    </div>
  )
}
