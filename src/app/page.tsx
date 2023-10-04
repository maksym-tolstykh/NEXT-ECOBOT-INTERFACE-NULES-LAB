"use client";

import { redirect } from "next/navigation";
import { useAppSelector } from "./redux/store";
import { useEffect } from "react";

export default function Home() {
  const isLogin = useAppSelector((state: any) => state.autReducer.value.isAuth);

  useEffect(() => {
    if (!isLogin) redirect("/login");
  }, []);
  return (
    <main className="flex flex-col w-full h-full justify-center items-center">
      <h1 className="mt-7 font-bold text-[32px]">
        Вас вітає панель керування SaveEco bot
      </h1>
      <p>
        Для перегляду даних, зліва на панелі виберіть відповідну таблицю, дані
        якої ви хочете побачити.
      </p>
    </main>
  );
}
