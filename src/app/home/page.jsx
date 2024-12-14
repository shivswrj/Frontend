"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push("/auth/login");
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      router.push("/auth/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div>
          <h2 className="lg:text-[36px] max-sm:text-[24px] max-lg:text-[28px] font-medium">Welcome to</h2>
          <h2 className="lg:text-[46px] max-sm:text-[28px] max-lg:text-[36px] font-black text-indigo-600 mb-4">Unstop</h2>
        </div>
        <div className="border border-gray-300 py-5 px-12 mt-16 shadow-md flex flex-col items-center rounded-2xl bg-white">
          <img
            src="/assets/Frame1116607307.png"
            alt="User Avatar"
            className="h-24 w-24 rounded-full object-cover"
          />
          <h4 className="font-bold text-indigo-600 mt-2">{user?.displayName || "User"}</h4>
          <h4 className="text-sm font-medium text-gray-600">{user?.email || "example@gmail.com"}</h4>
          <h6 className="text-sm font-medium text-gray-600">{user?.gender || "Not specified"}</h6>
          <button
            onClick={handleLogout}
            className="bg-indigo-600 text-white text-sm font-bold h-12 w-32 flex justify-center items-center rounded-2xl mt-4 hover:bg-indigo-500 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
