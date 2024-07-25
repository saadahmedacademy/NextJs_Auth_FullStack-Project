"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface UserData {
  _id: string;
  name: string;
  email: string;
}

function ShowProfile() {
  const route = useRouter();
  const [data, setData] = useState<UserData | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUserData = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/users/profile');
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Something went wrong while getting user profile data:", error);
      setError(true);
      setLoading(false);
      toast.error("Profile not found");
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      route.push('/login');
      toast.success("User logged out successfully");
    } catch (error) {
      console.error("Something went wrong while trying to logout:", error);
      toast.error("Logout failed");
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen min-w-full text-white bg-slate-600">
      <div className='w-[300px] h-[500px] p-5 rounded-lg flex flex-col items-center justify-center gap-3 bg-gray-800'>
        <h1>Profile Page</h1>
        {loading ? (
          <h1 className='text-4xl'>Loading...</h1>
        ) : error ? (
          <h1 className='text-4xl'>Something went wrong</h1>
        ) : data ? (
          <div className='mx-5'>
            <h3>User Profile</h3>
            <p><strong>ID:</strong> {data._id}</p>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <Link href={`/profile/${data._id}`} className="text-blue-500 underline">
              View Full Profile
            </Link>
          </div>
        ) : (
          <h1 className='text-4xl'>No profile data</h1>
        )}
        <hr />
        <button onClick={logout} className='bg-red-600 text-white rounded-lg p-3'>
          Logout
        </button>
        <button onClick={getUserData} className='bg-blue-700 text-white rounded-lg p-3'>
          Get Profile
        </button>
      </div>
    </div>
  );
}

export default ShowProfile;
