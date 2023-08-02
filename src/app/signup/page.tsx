"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const SignUp = () => {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };
  const router = useRouter();
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, userName } = user;
    try {
      setLoading(true);
      await axios.post("api/users/signup", user);
      if (email != "" && password != "" && userName != "") {
        setUser(initialState);
        router.push("/login");
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [user, setUser] = useState(initialState);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { email, password, userName } = user;
    setDisabled(true);
    if (email != "" && password != "" && userName != "") {
      setDisabled(false);
    }
  }, [user]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center  p-4 bg-slate-600 max-w-3xl mx-auto mt-20 rounded-lg drop-shadow-xl "
    >
      <h2 className="text-4xl font-semibold mb-8">
        {loading ? "Loading ...." : "SignUp"}
      </h2>

      <h2 className="text-4xl font-semibold mb-8 text-red-500">{message}</h2>

      <div className="flex flex-col  space-y-4">
        <div className="flex items-center space-x-4">
          <label>userName</label>
          <input
            name="userName"
            onChange={onChangeHandler}
            value={user.userName}
            type="text"
            placeholder="Enter ur user Name"
            className="px-4 py-2 rounded-lg text-black outline-none"
          />
        </div>
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
      <button
        disabled={disabled}
        className="mt-10 bg-blue-500 px-6 py-3 rounded-lg "
        type="submit"
      >
        SignUp
      </button>
      <Link className="underline text-red-500" href="/login">
        Login
      </Link>
    </form>
  );
};

export default SignUp;
