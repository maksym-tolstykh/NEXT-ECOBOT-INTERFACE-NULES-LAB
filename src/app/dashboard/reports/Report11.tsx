"use client";
import React from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

function Report11() {
  return (
    <div className="flex justify-between">
      <iframe
        style={{ display: "block", width: "75vw", height: "75vh" }}
        title="1"
        width={"100vw"}
        height={"50vh"}
        src="https://app.powerbi.com/reportEmbed?reportId=e2249443-7ec2-46e9-afbe-621ff5306699&autoAuth=true&ctid=d6599f68-2d2c-4cae-9ecf-60052b7d0bd9"
        frameborder="0"
        //@ts-ignore
        allowFullScreen="true"
      ></iframe>
    </div>
  );
}

export default Report11;
