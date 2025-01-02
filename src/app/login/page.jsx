"use client";
import React, { useState , useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "../Navbar/style.css";
function LoginPage() {
  const [eye, setEye] = useState(true);
  const [user, setUser] = React.useState({
    userName: "",
    password: "",
  });
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setAlert("");
    }, 5000);
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.userName.length > 0 && user.password.length > 0) {
      setLoading(true);
      const res = await axios.post("/api/users/signin", {
        userName: user.userName,
        password: user.password,
      });
      setLoading(false);

      console.log("Login Response:", res); // Check the response status
      if (res.status === 200) {
        // Clear form fields
        setUser({ userName: "", password: "" });

        // Navigate to the profile page
        router.push("/");
      } else {
        console.error("Login failed:", res.data.message);
        setAlert("Login failed: " + res.data.message);
      }
    } else {
      setAlert("enter all crediesntials");
    }
  };
  return (
    <div className=" bg_url flex flex-col items-center justify-center min-h-screen py-2">
      {alert != "" && (
        <div role="alert" className=" absolute z-[100] alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{alert}</span>
        </div>
      )}
      {loading && <h1>proccessing...</h1>}

      <h1 className="pacifico-regular mb-6">_login_</h1>
      {!loading && (
        <>
          <form
            onSubmit={handleSubmit}
            className="flex flex-row border-[2px] bg-slate-100 bg-opacity-70   px-12 w-[40vw] p-5 rounded-2xl border-teal-950  content-between  "
          >
            <div>
              <div>
                <input
                  value={user.userName}
                  onChange={(e) =>
                    setUser({ ...user, userName: e.target.value })
                  }
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="username"
                  title="Please enter a valid userName address"
                  className="mb-2 border-b-[1px] bg-slate-100 bg-opacity-70  border-t-neutral-950  border-teal-950 outline-none fontfamily  text-teal-950  pl-2"
                />
              </div>
              <div className="flex items-center">
                <input
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  type={!eye ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="password"
                  minLength={3}
                  maxLength={10}
                  className="mb-2 border-b-[1px] bg-slate-100 bg-opacity-70  border-t-neutral-950  border-teal-950 outline-none fontfamily  text-teal-950  pl-2"
                />
                {!eye ? (
                  <FaEye
                    onClick={() => setEye(!eye)}
                    className=" mt-[1px] border-b-[1px] border-t-neutral-950  border-teal-950 "
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setEye(!eye)}
                    className="mt-[1px] border-b-[1px] border-t-neutral-950  border-teal-950"
                  />
                )}
              </div>
              <input
                className="mt-2 w-full text-white p-1 rounded-2xl fontfamily hover:bg-teal-800 btn-success bg-teal-950 "
                type="submit"
                value="Login"
              />
            </div>
            <div className="dis bg_gif w-full  mx-4 rounded-2xl "></div>
          </form>
          <Link
            className=" text-teal-950  no-underline font-semibold mt-3 "
            href="signup"
          >
            have not signed up yet ?! signup
          </Link>
        </>
      )}
    </div>
  );
}

export default LoginPage;
