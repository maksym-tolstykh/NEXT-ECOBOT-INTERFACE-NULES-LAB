"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

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

function Coordinates() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [coordinatesList, setcoordinatesList] = useState();

  // if( typeof window !== 'undefined')

  useEffect(() => {
    setIsMounted(true);
    const func = async () => {
      setcoordinatesList(await GetCoordinates());
    };
    func();
  }, []);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1001/1001022.png",
    iconSize: [38, 38],
  });

  return (
    <div className="p-3 w-full">
      {/* Map Container */}
      <div className="w-full h=[250px] mb-3">
        {typeof window !== "undefined" && (
          <MapContainer
            //@ts-ignore
            center={[50.43, 30.57]} // Set your initial map center coordinates
            zoom={13} // Set the initial zoom level
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              //@ts-ignore
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              //@ts-ignore
              coordinatesList?.rows?.map((item: any, index: number) => (
                <Marker
                  key={index}
                  position={[item.location.y, item.location.x]}
                  icon={customIcon}
                >
                  <Popup>{item.station_name}</Popup>
                </Marker>
              ))
            }
          </MapContainer>
        )}
      </div>
      {/* End map container */}
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
    </div>
  );
}

export default Coordinates;
