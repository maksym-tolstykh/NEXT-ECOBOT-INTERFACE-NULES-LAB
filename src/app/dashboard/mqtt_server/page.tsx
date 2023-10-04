"use client";

import React from "react";
import { toast } from "react-toastify";

const GetCategories = async () => {
  try {
    const res = await fetch("/api/mqtt_server", {
      method: "GET",
      //@ts-ignore
      "Content-Type": "application/json",
    });
    return await res.json();
  } catch (error) {
    toast.error("Сталася помилка, для деталей дивіться в консоль", {
      position: "top-right",
      autoClose: 5000,
    });
    console.log(error);
  }
};

async function Favorite() {
  const mu = await GetCategories();

  return (
    <div className="p-3 w-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID серверу
              </th>
              <th scope="col" className="px-6 py-3">
                Посилання
              </th>
              <th scope="col" className="px-6 py-3">
                Статус
              </th>
            </tr>
          </thead>
          <tbody>
            {mu?.rows?.map((item: any, index: number) => (
              <tr
                key={item}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.id_server}
                </th>
                <td className="px-6 py-4"> {item.url}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {item.status}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Favorite;
