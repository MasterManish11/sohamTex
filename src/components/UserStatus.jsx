"use client";
import useAuth from "../app/useAuth";
import React from "react";

const UserStatus = () => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex items-center">
          <button
            onClick={() => logout()}
            className=" py-2 px-4 text-red-600 hover:bg-red-200 cursor-pointer rounded-md font-semibold"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="hidden items-center hover:bg-gray-600 rounded ">
          <button
            onClick={() => login()}
            className="p-1 text-white font-semibold "
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default UserStatus;
