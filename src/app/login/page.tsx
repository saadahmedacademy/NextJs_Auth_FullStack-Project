"use client";
import { useState, useEffect } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Page() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user.password === "" || user.email === "" ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  const onLogin = async () => {
    if (user.password === "" ||user.email === ""  ) {
      toast.error("All fields are required");
    }
    

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      router.push("/profile");
      console.log("SignUp successfully\n", response.data);
    } catch (error: any) {
      console.error(`Error: When clicked on login raised this error \n ${error}`);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const showPass = () => {
    setShow(!show);
  };

  return (
    <div className="min-w-full min-h-screen bg-zinc-600 flex justify-center items-center">
      <div>
        <form className="flex flex-col w-[400px] text-black gap-4 font-serif rounded-lg bg-zinc-800 p-7">
          <h3 className="text-xl text-white">{loading ? "Loading..." : "Login"}</h3>
         
          <input
            onChange={handleChange}
            value={user.email}
            name="email"
            className="p-1 rounded-sm"
            type="email"
            placeholder="Enter Your Email"
          />
          <div className="relative w-full">
            <input
              onChange={handleChange}
              value={user.password}
              name="password"
              className="p-1 rounded-sm w-full text-black"
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
            />
            <span className="text-xl absolute right-2 top-1">
              {show ? (
                <FaLock onClick={showPass} className="text-black" />
              ) : (
                <FaLockOpen onClick={showPass} className="text-black" />
              )}
            </span>
          </div>
          <input
            onClick={onLogin}
            type="button"
            value="Submit"
            className="p-1 bg-slate-600"
            style={{ border: "1px outset black", borderRadius: "5px" }}
            disabled={buttonDisabled || loading}
          />
        </form>
      </div>
    </div>
  );
}

export default Page;
