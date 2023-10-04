import React from "react";

import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

const GetCoordinates = async () => {
  try {
    const res = await fetch("/api/coordinates", {
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

function CordinatesTable() {
  const [coordinatesList, setcoordinatesList] = useState();

  useEffect(() => {
    const func = async () => {
      setcoordinatesList(await GetCoordinates());
    };
    func();
  }, []);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Назва станції
            </th>
            <th scope="col" className="px-6 py-3">
              Координати
            </th>
          </tr>
        </thead>
        <tbody>
          {
            //@ts-ignore
            coordinatesList?.rows?.map((item: any, index: number) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.station_name}
                </th>
                <td className="px-6 py-4">
                  {item.location.x} {item.location.y}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default CordinatesTable;
