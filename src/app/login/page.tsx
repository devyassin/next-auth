"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const initialState = {
    email: "",
    password: "",
  };
  const router = useRouter();
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = user;
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", user);
      if (email != "" && password != "") {
        setUser(initialState);
      }
      router.push(`/profile/${response.data.payload.userId}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [user, setUser] = useState(initialState);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center  p-4 bg-slate-600 max-w-3xl mx-auto mt-20 rounded-lg drop-shadow-xl "
    >
      <h2 className="text-4xl font-semibold mb-8">
        {loading ? "Loading ....." : "LoginPage"}
      </h2>
      <div className="flex flex-col  space-y-4">
        <div className="flex items-center space-x-12">
          <label>Email</label>
          <input
            name="email"
            onChange={onChangeHandler}
            value={user.email}
            type="email"
            placeholder="Enter ur Email"
            className="px-4 py-2 rounded-lg outline-none text-black"
          />
        </div>
        <div className="flex items-center space-x-5">
          <label>Password</label>
          <input
            name="password"
            onChange={onChangeHandler}
            value={user.password}
            type="password"
            placeholder="Enter ur Password"
            className="px-4 py-2 rounded-lg outline-none text-black"
          />
        </div>
      </div>
      <button className="mt-10 bg-blue-500 px-6 py-3 rounded-lg " type="submit">
        Login
      </button>
      <Link className="underline text-red-500" href="/signup">
        SignUp
      </Link>
    </form>
  );
};

export default LoginPage;
