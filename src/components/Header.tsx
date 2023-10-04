"use client";

import { useState } from "react";
import Link from "next/link";
import { logOut } from "@/app/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLogin = useAppSelector((state: any) => state.autReducer.value.isAuth);

  const dispatch = useDispatch<AppDispatch>();
  const handleClearCookie = () => {
    dispatch(logOut());
    router.replace("/login");
  };

  return (
    <header className="bg-white border-b-2 border-x-gray-500">
      <nav
        className="mx-auto flex max-w-7xl items-center  justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div>
          <span className="font-bold">SAVEECOBOT</span>
        </div>
        <div className="flex items-center  ">
          <div className="mx-2">
            <Link href="/">Dashboard</Link>
          </div>
          <button
            className=" flex mx-2 justify-center rounded-md bg-[#28a745] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#218838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            onClick={
              isLogin ? handleClearCookie : () => router.replace("/login")
            }
          >
            {isLogin ? "Вийти" : "Увійти"}
          </button>
        </div>
      </nav>
    </header>
  );
}
