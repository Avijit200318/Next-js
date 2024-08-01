"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {axios} from "axios";

export default function Signup() {

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="">Signup</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input id="username" type="text" onChange={(e) => setUser({...user, username: e.target.value})} value={user.username} placeholder="username" className="px-4 py-2 border border-black"/>
        <label htmlFor="email">email:</label>
        <input id="email" type="email" onChange={(e) => setUser({...user, email: e.target.value})} value={user.email} placeholder="email" className="px-4 py-2 border border-black"/>
        <label htmlFor="password">password</label>
        <input id="password" type="password" onChange={(e) => setUser({...user, password: e.target.value})} value={user.password} placeholder="password" className="px-4 py-2 border border-black"/>
        <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Signup</button>
        <Link href='/login'>Already have an account</Link>
    </div>
  )
}
