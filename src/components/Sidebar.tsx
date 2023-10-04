"use client";

import Link from "next/link";
import { useAppSelector } from "@/app/redux/store";

const sidebarLinks = [
  { link: "category", title: "Категорії (Category)" },
  { link: "coordinates", title: "Координати (Coordinates)" },
  { link: "favorite", title: "Позначені (Favorite)" },
  { link: "measured_unit", title: "Одиниці вимірювання(Measured_unit)" },
  { link: "measurement", title: "Вимірювання (Measurment)" },
  { link: "mqtt_server", title: "Mqtt_server" },
  { link: "mqtt_unit", title: "Mqtt_unit" },
  { link: "optimal_value", title: "Оптимальні значення" },
  { link: "stations", title: "Станції" },
];

export default function Sidebar() {
  const isLogin = useAppSelector((state: any) => state.autReducer.value.isAuth);

  return isLogin ? (
    <nav
      className="flex flex-col w-[330px]  border-r-2  border-y-gray-500 p-3"
      aria-label="Global"
    >
      {sidebarLinks.map((item, index) => (
        <Link
          replace
          key={index}
          className=" flex mx-2 my-2 justify-start rounded-md bg-[#28a745] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  hover:bg-[#218838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          href={`/dashboard/${item.link}`}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  ) : (
    <></>
  );
}
