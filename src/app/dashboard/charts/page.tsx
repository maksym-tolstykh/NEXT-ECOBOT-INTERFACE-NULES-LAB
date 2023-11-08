import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";
import Chart4 from "./Chart4";

function Charts() {
  return (
    <div className="p-3 w-full">
      {/* Chart 1 */}
      <div>
        <h1 className="mb-4 text-[35px] font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
          Максимальні значеня шкідливих частинок PM2.5, PM10 в розрізі областей
          за вказаний період часу.
        </h1>
        <div className="w-[65%]">
          <Chart1 />
        </div>
      </div>
      {/* Chart 2 */}
      <div>
        <h1 className="mb-4 text-[35px] font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
          Кількість, зафіксовано середньодобових значень шкідливих твердих
          частинок PM2.5
        </h1>
        <div className="w-[61%]">
          <Chart2 />
        </div>
      </div>
      {/* Chart 3 */}
      <div>
        <h1 className="mb-4 text-[35px] font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
          Кількість вимірювань, які відносяться до категорій оптимальних значень
          для діоксиду сірки.
        </h1>
        <div className="w-[61%]">
          <Chart3 />
        </div>
      </div>
      {/* Chart 3 */}
      <div>
        <h1 className="mb-4 text-[35px] font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
          Кількість вимірювань, які відносяться до категорій оптимальних значень
          для чадного газу.
        </h1>
        <div className="w-[61%]">
          <Chart4 />
        </div>
      </div>
    </div>
  );
}

export default Charts;
