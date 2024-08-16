'use client';

import React, { useState } from 'react';
import { useSignUp, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Navbar from '@/app/navbar';
import { UserType, accountRole } from '@/types/userType';

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isLoaded: authLoaded, userId } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<accountRole>(accountRole.Business);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [orgName, setOrgName] = useState('');

  const toggleShowPassword = () => setShowPassword(!showPassword);

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
      console.error('Error during sign-up:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });

        await new Promise((resolve) => {
          const interval = setInterval(() => {
            if (authLoaded) {
              clearInterval(interval);
              resolve(null);
            }
          }, 100);
        });

        await createNewUser();
      } else {
        console.error('Verification failed:', completeSignUp);
      }
    } catch (err) {
      console.error('Error during verification:', err);
    } finally {
      setLoading(false);
    }
  };

  const createNewUser = async () => {
    if (!userId) {
      console.error("User ID is null or undefined.");
      setLoading(false);
      return;
    }

    const newUser: UserType = {
      clerkID: userId!,
      firstName,
      lastName,
      userName: username,
      accountEmail: emailAddress,
      accountRole: [role],
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
        console.error('Failed to create user.');
      }

      if (role === accountRole.Business) {
        router.push('/business');
      } else if (role === accountRole.Institution) {
        router.push('/institution');
      }
    } catch (error) {
      console.error('Error saving user to database:', error);
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

      {!pendingVerification ? (
        <div className="w-full max-w-sm"> {/* Reduced the max width */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-md font-semibold mb-2 block">Email:</label>
            <input
              type="email"
              id="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="mb-4 h-10 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full" // Adjusted height to maintain aspect ratio
              required
            />

            <label htmlFor="username" className="text-md font-semibold mb-2 block">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-4 h-10 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full"
              required
            />

            <div className="flex mb-4">
              <div className="w-1/2 pr-1">
                <label htmlFor="firstName" className="text-md font-semibold mb-2 block">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-10 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full"
                  required
                />
              </div>
              <div className="w-1/2 pl-1">
                <label htmlFor="lastName" className="text-md font-semibold mb-2 block">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-10 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full"
                  required
                />
              </div>
            </div>

            <label htmlFor="username" className="text-md font-semibold mb-2 block">Org Name:</label>
            <input
              type="text"
              id="username"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="mb-4 h-10 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full"
              required
            />

            <label htmlFor="role" className="text-md font-semibold mb-2 block">Account Type:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as accountRole)}
              className="mb-4 h-10 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 w-full"
              required
            >
              <option value={accountRole.Business}>{accountRole.Business}</option>
              <option value={accountRole.Institution}>{accountRole.Institution}</option>
            </select>

            <label htmlFor="password" className="text-md font-semibold mb-2 block">Password:</label>
            <div className="relative mb-6">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full"
                required
              />
              <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-3">
                {showPassword ? (
                  <HiOutlineEyeOff className="h-6 w-6 text-gray-400" />
                ) : (
                  <HiOutlineEye className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="h-10 bg-black rounded-lg flex justify-center items-center mb-4 w-full"
            >
              <span className="text-white text-lg font-semibold">Sign up</span>
            </button>

            <Link href="/sign-in" className="block text-center text-md text-black">
              Already have an account? Log in
            </Link>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-sm">
          <form onSubmit={handleVerify}>
            <label htmlFor="code" className="text-md font-semibold mb-2 block">Verification Code:</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mb-4 h-10 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500 w-full"
              required
            />

            <button
              type="submit"
              className="h-10 bg-black rounded-lg flex justify-center items-center mb-4 w-full"
            >
              <span className="text-white text-md font-semibold">Verify</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}