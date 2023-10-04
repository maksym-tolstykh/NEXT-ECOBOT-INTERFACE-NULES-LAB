"use client";

import React from "react";
import { toast } from "react-toastify";

const colors = [
  "#17a355",
  "#e9d109",
  "#f37e00",
  "#ea270d",
  "#7c2c85",
  "#66001f",
];

const GetCategories = async () => {
  try {
    const res = await fetch("/api/category", {
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

async function Category() {
  const categories = await GetCategories();

  return (
    <div className="p-3 w-full">
      <div className="grid grid-cols-2 gap-4 ">
        {categories?.rows?.map((item: any) => {
          return (
            <div
              style={{ backgroundColor: colors[+item.id_category - 1] }}
              className="text-white mx-1 p-2 col-span-1 rounded-3xl text-center"
              key={item.id_category}
            >
              <span className="text-3xl font-bold"> {item.designation}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
