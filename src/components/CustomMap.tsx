"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
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

function CustomMap() {
  const [coordinatesList, setcoordinatesList] = useState();

  useEffect(() => {
    const func = async () => {
      setcoordinatesList(await GetCoordinates());
    };
    func();
  }, []);

  return (
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
            //@ts-ignore
            icon={
              new Icon({
                iconUrl:
                  "https://cdn-icons-png.flaticon.com/512/1001/1001022.png",
                iconSize: [38, 38],
              })
            }
          >
            <Popup>{item.station_name}</Popup>
          </Marker>
        ))
      }
    </MapContainer>
  );
}

export default CustomMap;
