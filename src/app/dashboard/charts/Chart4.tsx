"use client";
import React, { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart4() {
  const [data, setdata] = useState(null);
  const [chartD, setchartD] = useState(null);
  console.log(data);

  const getDataChart1 = async () => {
    try {
      const res = await fetch("/api/charts/chart4", {
        method: "GET",
        //@ts-ignore
        "Content-Type": "application/json",
      });
      const resData = await res.json();
      console.log(resData?.rows);

      setdata(resData?.rows);
      //@ts-ignore
      setchartD(transformDataForChart(resData?.rows));
      //return await res.json();
    } catch (error) {
      toast.error("Сталася помилка, для деталей дивіться в консоль", {
        position: "top-right",
        autoClose: 5000,
      });
      console.log(error);
    }
  };
  const transformDataForChart = (data: any) => {
    const chartData = {
      labels: ["Good", "Moderate", "Poor", "Very Poor"],
      datasets: [
        {
          label: "Air Quality",
          data: [
            parseFloat(data[0].good_count),
            parseFloat(data[0].moderate_count),
            parseFloat(data[0].poor_count),
            parseFloat(data[0].verypoor_count),
          ],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    console.log(chartData);

    return chartData;
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    getDataChart1();
    console.log(data);
  }, []);

  return (
    <div>
      {data && chartD ? (
        <Doughnut data={chartD} />
      ) : (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default Chart4;
