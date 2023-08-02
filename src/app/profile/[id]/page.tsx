"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  params: { id: string };
};

const UserProfile = ({ params: { id } }: Props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const getResult = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/users/${id}`);
        setUser(response.data.user);
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false); // In case of an error, set loading to false
      }
    };
    getResult();
  }, [id]); // Add "id" as a dependency so that useEffect will re-run when the ID changes

  const logoutHandler = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
  if (!loading) {
    return (
      <div className="flex flex-col items-center ">
        <button
          onClick={logoutHandler}
          className="text-5xl mt-10 self-start ml-5 px-4 py-2 rounded-lg bg-blue-500 "
        >
          Logout
        </button>
        <div className="text-5xl mt-10 text-center ">{user?.email}</div>
        <div className="text-5xl mt-10 text-center ">{user?.userName}</div>
      </div>
    );
  } else {
    return <div className="text-5xl mt-10 text-center">Loading...</div>;
  }
};

export default UserProfile;
