'use client';

import * as React from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeOff } from "react-icons/hi";
import Navbar from '@/app/navbar';

export default function LogIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push('/retail'); //do this for now until different user types have been setup
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-gray-50 p-6">
      <Navbar />
      {loading && <ClipLoader size={50} color={"#123abc"} loading={loading} />}

      <div className="w-full max-w-md">
        <label htmlFor="email" className="text-lg font-semibold mb-2 block">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Your email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full"
        />
        
        <label htmlFor="password" className="text-lg font-semibold mb-2 block">Password:</label>
        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Your password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-3"
          >
            {showPassword ? (
              <HiOutlineEyeOff  className="h-6 w-6 text-gray-400" />
            ) : (
              <HiOutlineEye className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="h-12 bg-black rounded-lg flex justify-center items-center mb-4 w-full"
        >
          <span className="text-white text-lg font-semibold">Login</span>
        </button>

        <Link href="/forgotPassword" className="mb-2 block text-center text-lg my-3 text-black">
          Forgot Password?
        </Link>
        <Link href="/register" className="block text-center text-lg text-black">
          Create Account
        </Link>
      </div>
    </div>
  );
}