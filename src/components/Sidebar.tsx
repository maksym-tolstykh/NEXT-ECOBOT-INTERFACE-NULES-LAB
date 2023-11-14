"use client";

import Link from "next/link";
import { useAppSelector } from "@/app/redux/store";
import { useEffect } from "react";
import { useState } from "react";

const sidebarLinks = [
  { link: "category", title: "Категорії (Category)", name: ["admin"] },
  { link: "coordinates", title: "Координати (Coordinates)", name: ["admin"] },
  { link: "favorite", title: "Позначені (Favorite)", name: ["admin"] },
  {
    link: "measured_unit",
    title: "Одиниці вимірювання(Measured_unit)",
    name: ["admin"],
  },
  { link: "measurement", title: "Вимірювання (Measurment)", name: ["admin"] },
  { link: "mqtt_server", title: "Mqtt_server" },
  { link: "mqtt_unit", title: "Mqtt_unit", name: ["admin"] },
  { link: "optimal_value", title: "Оптимальні значення", name: ["admin"] },
  { link: "stations", title: "Станції", name: ["admin"] },
  { link: "reports", title: "Звіти", name: ["admin", "max", "user1"] },
  { link: "charts", title: "Графіки", name: ["admin", "max", "user1"] },
];

export default function Sidebar() {
  const isLogin = useAppSelector((state: any) => state.autReducer.value.isAuth);

  const name = localStorage.getItem("name") || null;
  console.log(name);

  return isLogin ? (
    <nav
      className="flex flex-col w-[330px]  border-r-2  border-y-gray-500 p-3"
      aria-label="Global"
    >
      {sidebarLinks.map((item, index) => {
        if (item.name?.includes(name)) {
          // console.log(item.title);
          return (
            <Link
              replace
              key={index}
              className=" flex mx-2 my-2 justify-start rounded-md bg-[#28a745] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  hover:bg-[#218838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              href={`/dashboard/${item.link}`}
            >
              {item.title}
            </Link>
          );
        }
      })}
    </nav>
  ) : (
    <></>
  );
}
