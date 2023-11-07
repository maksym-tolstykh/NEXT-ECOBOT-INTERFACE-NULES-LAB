import React from "react";
//import Report11 from "./Report11";
import dynamic from "next/dynamic";

const Report11 = dynamic(() => import("./Report11"), {
  ssr: false,
});

function Report1() {
  return (
    <div>
      <Report11 />
    </div>
  );
}

export default Report1;
