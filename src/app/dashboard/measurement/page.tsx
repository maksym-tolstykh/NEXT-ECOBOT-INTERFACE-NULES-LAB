"use client";

import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const GetCategories = async (page: number) => {
  try {
    const res = await fetch("/api/measurement", {
      method: "POST",
      body: page.toString(),
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
function Favorite() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentPage, setcurrentPage] = useState(0);
  const [measurments, setmeasurments] = useState();
  useEffect(() => {
    const queryPageParam = searchParams.get("page") || 0;
    if (queryPageParam) setcurrentPage(+queryPageParam);

    const getData = async () => {
      const data = await GetCategories(+queryPageParam || currentPage);
      setmeasurments(data);
      console.log(data);
    };
    getData();
  }, []);
  // console.log(measurments);

  const handlePagination = async (page: number) => {
    setcurrentPage(currentPage + page);
    router.push(
      pathname + "?" + createQueryString("page", `${currentPage + page}`)
    );
    const data = await GetCategories(currentPage + page);
    setmeasurments(data);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="p-3 w-full ">
      <div className="h-[calc(100vh-170px)] overflow-auto">
        <div className="relative overflow-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  Назва
                </th>
                <th scope="col" className="px-6 py-3">
                  Значення
                </th>
                <th scope="col" className="px-6 py-3">
                  Одиниці вимірювання
                </th>
                <th scope="col" className="px-6 py-3">
                  Час
                </th>
              </tr>
            </thead>
            <tbody>
              {
                //@ts-ignore
                measurments?.respBody[0]?.map((item: any, index: number) => {
                  const date = new Date(item.time);
                  const formattedDate = date.toLocaleDateString();
                  const formattedTime = date.toLocaleTimeString();
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.id_measurement}
                      </th>
                      <td className="px-6 py-4"> {item.station_name}</td>
                      <td className="px-6 py-4"> {item.value}</td>
                      <td className="px-6 py-4"> {item.measurement_unit}</td>
                      <td className="px-6 py-4">
                        {formattedDate} {formattedTime}
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}

      <div className="flex justify-between m-2 p-2 items-center">
        <span>
          {`Сторінка: ${currentPage} з ${
            //@ts-ignore
            measurments?.respBody[1] || ""
          }`}
        </span>
        <div className="flex">
          <button
            className=" flex mx-2 justify-center rounded-md bg-[#28a745] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#218838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            disabled={currentPage > 0 ? false : true}
            onClick={() => handlePagination(-1)}
          >
            Назад
          </button>
          <button
            className=" flex mx-2 justify-center rounded-md bg-[#28a745] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#218838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            onClick={() => handlePagination(1)}
          >
            Далі
          </button>
        </div>
      </div>
    </div>
  );
}

export default Favorite;
