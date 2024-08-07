'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSignUp, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeOff } from "react-icons/hi";
import Navbar from '@/app/navbar';
import { UserType, accountRole } from '@/types/userType';

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<accountRole>(accountRole.Retail);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { isLoaded: authLoaded, userId } = useAuth();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);

    try {
      await signUp.create({
        username,
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);

    const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

    if (completeSignUp.status === 'complete') {
      await setActive({ session: completeSignUp.createdSessionId });

      // Wait for auth to load user ID
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (authLoaded) {
            clearInterval(interval);
            resolve(null);
          }
        }, 100);
      });

      createNewUser();
    } else {
      console.error(JSON.stringify(completeSignUp, null, 2));
    }
  };

  const createNewUser = async () => {
    if (!userId) {
      console.error("User ID is null or undefined.");
      setLoading(false);
      return;
    }

    try {
      const newUser: UserType = {
        clerkID: userId!,
        firstName,
        lastName,
        userName: username,
        accountEmail: emailAddress,
        accountRole: role,
        wallets: [],
      };

      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (!response.ok) {
          console.log('Failed to create user.');
        }
      } catch (error) {
        console.error('Error saving user to database:', error);
      }

      if(role === accountRole.Retail) {
        router.push('/retail');
      } else if (role === accountRole.Business) {
        router.push('/business');
      } else if (role === accountRole.Institution) {
        router.push('/institution');
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center items-center bg-gray-50 p-6">
      <Navbar />
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-50 bg-opacity-75">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      )}

      {!pendingVerification && (
        <div className="w-full max-w-md">
          <label htmlFor="email" className="text-lg font-semibold mb-2 block">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Your email here"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="mb-4 h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full"
          />

          <label htmlFor="username" className="text-lg font-semibold mb-2 block">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Your username here"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full"
          />

          <div className="flex mb-4">
            <div className="w-1/2 pr-1">
              <label htmlFor="firstName" className="text-lg font-semibold mb-2 block">First Name:</label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full"
              />
            </div>
            <div className="w-1/2 pl-1">
              <label htmlFor="lastName" className="text-lg font-semibold mb-2 block">Last Name:</label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full"
              />
            </div>
          </div>

          {/* DROPDOWN HERE FOR ACCOUNT TYPE SELECTION */}
          <label htmlFor="role" className="text-lg font-semibold mb-2 block">Account Type:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as accountRole)}
            className="mb-4 h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 w-full"
          >
            <option value={accountRole.Retail}>{accountRole.Retail}</option>
            <option value={accountRole.Business}>{accountRole.Business}</option>
            <option value={accountRole.Institution}>{accountRole.Institution}</option>
          </select>

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
                <HiOutlineEyeOff className="h-6 w-6 text-gray-400" />
              ) : (
                <HiOutlineEye className="h-6 w-6 text-gray-400" />
              )}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="h-12 bg-black rounded-lg flex justify-center items-center mb-4 w-full"
          >
            <span className="text-white text-lg font-semibold">Sign up</span>
          </button>

          <Link href="/sign-in" className="block text-center text-lg text-black">
            Already have an account? Log in
          </Link>
        </div>
      )}

      {pendingVerification && (
        <div className="w-full max-w-md">
          <label htmlFor="code" className="text-lg font-semibold mb-2 block">Verification Code:</label>
          <input
            type="text"
            id="code"
            placeholder="Enter your verification code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mb-4 h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full"
          />

          <button
            onClick={handleVerify}
            className="h-12 bg-black rounded-lg flex justify-center items-center mb-4 w-full"
          >
            <span className="text-white text-lg font-semibold">Verify Email</span>
          </button>

          <Link href="/sign-in" className="block text-center text-lg text-black">
            Already have an account? Log in
          </Link>
        </div>
      )}
    </div>
  );
}