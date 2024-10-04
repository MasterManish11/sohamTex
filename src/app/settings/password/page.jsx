'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Password = () => {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (password === '52135213') {
      localStorage.setItem('savedPassword', JSON.stringify(password));
      router.push('/settings/machineparameter');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-gradient-to-r from-slate-900 to-gray-600 rounded-md">
      <div className="p-6 bg-white rounded shadow-md">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="border border-gray-300 p-2 rounded mb-4 w-full"
        />
        <div className="flex  flex-col justify-between items-center space-y-3  ">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
          >
            Enter
          </button>
          <Link
            href={'/'}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-center"
          >
            {' '}
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Password;
