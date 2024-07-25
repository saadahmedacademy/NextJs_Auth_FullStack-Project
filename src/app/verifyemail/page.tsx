"use client"

import {useState ,useEffect} from 'react'
import { MdVerifiedUser } from "react-icons/md";
import { BiSolidErrorAlt } from "react-icons/bi";
import Link from 'next/link'
import toast from 'react-hot-toast'
import axios from 'axios'

function verificaiton() {

const [token, setToken] = useState("");
const [verified, setVerified] = useState(false);
const [error, setError] = useState(false);

const verifyUserEmail = async () =>{
   try {
     const res = await axios.post('/api/users/verifyEmail', {token});
     setVerified(true);
     toast.error("User Email Verified");

   } catch (error:any) {
     setError(true);
     console.log(error.response.data.message);
     toast.error(error.response.data.message);
   }
}

useEffect(() => {
  const extractToken = window.location.search.split('=')[1];
  console.log("Token : ",extractToken);
  setToken(extractToken || "");
}, []);

useEffect(() => {
  if(token.length > 0){
    verifyUserEmail();
  }
  
}, [token]);

      return (
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex 
      min-h-screen  items-center justify-center">
        <div className='flex flex-col items-center justify-center gap-3'>
        <h1>{verified ?  "User Email Verified" : "User Email Not Verified"}</h1>
        <p> {verified ? <MdVerifiedUser className='text-7xl text-green-500'/>: <BiSolidErrorAlt  className='text-7xl text-red-500'/>}</p>
            {token ? <p> Click <Link href="/login" className='text-blue-500'>here</Link> to login</p> : ""}
        </div>
      
      </div>
  )
}

export default verificaiton