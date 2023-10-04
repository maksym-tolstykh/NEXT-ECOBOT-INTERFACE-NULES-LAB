"use client";
import dynamic from "next/dynamic";

const CustomMap = dynamic(() => import("@/components/CustomMap"), {
  ssr: false,
});
const CordinatesTable = dynamic(() => import("./CordinatesTable"), {
  ssr: false,
});

function Coordinates() {
  return (
    <div className="p-3 w-full">
      {/* Map Container */}
      <div className="w-full h=[250px] mb-3">
        <CustomMap />
      </div>
      {/* End map container */}
      <CordinatesTable />
    </div>
  );
}

export default Coordinates;
