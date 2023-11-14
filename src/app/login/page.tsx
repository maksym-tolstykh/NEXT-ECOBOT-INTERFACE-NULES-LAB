"use client";
import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { logIn } from "@/app/redux/slices/authSlice";

const SignIn = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const res = fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    //@ts-ignore
    "Content-Type": "application/json",
  });

  return (await res).json();
};

function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  // const isLogin = useAppSelector((state: any) => state.autReducer.value.isAuth);

  // useEffect(() => {
  //   if (isLogin) redirect("/");
  // }, []);

  const handlSubmit = async (e: any) => {
    e.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      const res = await SignIn({
        username: usernameRef.current?.value,
        password: passwordRef.current.value,
      });
      if (res.status === 200) {
        localStorage.setItem("name", usernameRef.current?.value);

        dispatch(logIn(res.token));

        toast.success("Успіх!", {
          position: "top-right",
          autoClose: 5000,
        });
        router.push("/");
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            SaveEcoBot stations <br /> manager
          </h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Вхід в акаунт
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handlSubmit}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  ref={usernameRef}
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
