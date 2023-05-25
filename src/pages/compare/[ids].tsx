import { StationData } from "@ctypes/types";
import { useStationFetch } from "@hooks/useStationFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { getBlueSky } from "@database/queries";
import { useBlueSkyFetch } from "@hooks/useBlueSkyFetch";
import { useHumidityFetch } from "@hooks/useHumidityFetch";
import { useTemperatureFetch } from "@hooks/useTemperatureFetch";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

function CreateGraph({ id }: { id: string }) {
  const today = new Date();
  const three_days_ago = new Date();
  three_days_ago.setDate(today.getDate() - 3);

  const ids = id.split('-');
  const [stationData, setStationData] = useState<{ [id: string]: Array<StationData> }>({});

  useEffect(() => {
    const fetchData = async () => {
      const dataPromises = ids.map((id) => useStationFetch(id, three_days_ago, today));

      const results = await Promise.all(dataPromises);
      const newStationData = ids.reduce((acc, id, i) => ({ ...acc, [id]: results[i] }), {});
      setStationData(newStationData);
    };

    fetchData();
  }, []);

  const handleClick = (e: any) => {
    const { value } = e.target;

    // clear existing chart
    const canvas = document.getElementById("chart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }
    }

    Object.keys(stationData).forEach(id => {
      const data = stationData[id];
      switch (value) {
        case "sunHours":
          renderStationData(data, "Cloud Coverage", id);
          break;
        case "temperature":
          renderStationData(data, "Temperature", id);
          break;
        case "humidity":
          renderStationData(data, "Humidity", id);
          break;
        default:
          break;
      }
    });
  };

  return (
    <div className="buttons text-center">
      <button
        value={"sunHours"}
        className="w-32 mx-5 p-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        onClick={handleClick}
      >
        Sun Hours
      </button>
      <button
        value={"temperature"}
        className="w-32 mx-5 p-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        onClick={handleClick}
      >
        Temperature
      </button>
      <button
        value={"humidity"}
        className="w-32 mx-5 p-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        onClick={handleClick}
      >
        Humidity
      </button>
    </div>
  );
}
function renderStationData(
  data: Array<StationData>,
  label: string,
  id: string,
) {
  const canvas = document.getElementById("chart") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  
  if (ctx) {
    const existingChart = Chart.getChart(ctx);
    
    const labels = data.map((item) =>
      new Date(item.datetime).toLocaleString()
    );

    var chartData: Array<number> = [];

    switch (label) {
      case "Cloud Coverage":
        chartData = data.map((item) => item.cldc);
        break;
      case "Temperature":
        chartData = data.map((item) => item.temp);
        break;
      case "Humidity":
        chartData = data.map((item) => {
          const dewPoint = Number(item.dewp);
          const temperature = Number(item.temp);
          const relativeHumidity = 100 * (Math.exp((17.625 * dewPoint) / (243.04 + dewPoint)) / Math.exp((17.625 * temperature) / (243.04 + temperature)));
          return relativeHumidity.toPrecision(3);
        });
        break;
      default:
        break;
    }

    if (existingChart) {
      existingChart.data.datasets.push({
        label: id,
        data: chartData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
      });
      existingChart.update();
    } else {
      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: id,
              data: chartData,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 1,
            },
          ],
        },
        // the rest of your chart options...
      });
    }
  } else {
    console.error("Cannot create chart, canvas context is null");
  }
}

export default function StationPage() {
  const router = useRouter();
  const { ids } = router.query;

  return (
    <>
      <div className="bg-white min-h-screen p-6">
        <div className="buttons-chart flex flex-col flex-wrap">
          {ids ? <CreateGraph id={ids as string} /> : <h1>Loading...</h1>}
          <div
            className="chart-container flex justify-center"
            style={{ height: 400 }}
          >
            <canvas id="chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
