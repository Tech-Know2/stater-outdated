"use client";
import React, { useState } from 'react';
import { useAuth, useSignIn } from '@clerk/nextjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeOff } from "react-icons/hi";
import Navbar from '@/app/navbar';

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push('/retail');
  }

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then(_ => {
        setSuccessfulCreation(true);
        setError('');
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  // Reset the user's password. 
  // Upon successful reset, the user will be 
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then(result => {
        // Check if 2FA is required
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
          setError('');
        } else if (result.status === 'complete') {
          // Set the active session to 
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setError('');
        } else {
          console.log(result);
        }
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <Navbar />
      <h1 className="text-2xl font-semibold mb-4">Forgot Password?</h1>
      <form
        className="w-full max-w-md flex flex-col gap-4"
        onSubmit={!successfulCreation ? create : reset}
      >
        {!successfulCreation && (
          <>
            <label htmlFor='email' className="text-lg font-semibold">Please provide your email address</label>
            <input
              type='email'
              id='email'
              placeholder='e.g john@doe.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500"
            />

            <button
              type="submit"
              className="h-12 bg-black text-white rounded-lg flex items-center justify-center"
            >
              Send password reset code
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </>
        )}

        {successfulCreation && (
          <>
            <label htmlFor='password' className="text-lg font-semibold">Enter your new password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your new password"
                className="h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? (
                  <HiOutlineEyeOff className="h-6 w-6 text-gray-400" />
                ) : (
                  <HiOutlineEye className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>

            <label htmlFor='code' className="text-lg font-semibold">Enter the password reset code that was sent to your email</label>
            <input
              type='text'
              id='code'
              value={code}
              onChange={e => setCode(e.target.value)}
              className="h-12 border border-gray-300 rounded-lg p-2 bg-white text-gray-900 placeholder-gray-500"
            />

            <button
              type="submit"
              className="h-12 bg-black text-white rounded-lg flex items-center justify-center"
            >
              Reset
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </>
        )}

        {secondFactor && <p className="text-red-500">2FA is required, but this UI does not handle that</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;