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

function CreateGraph({ ids }: { ids: string[] }) {
  const today = new Date();
  const three_days_ago = new Date();
  three_days_ago.setDate(today.getDate() - 3);
  const data: (StationData | undefined)[] = [];

  for (let i = 0; i < ids.length; i++) {
    console.log(useStationFetch(ids[i], three_days_ago, today));
    data.push(useStationFetch(ids[i], three_days_ago, today));
      if (data) {
        renderStationData(data, "Cloud Coverage", ids[i], i);
      }
  }

  
  
  const handleClick = (e: any, id: string) => {
    const { value } = e.target;
    const data = useStationFetch(id, three_days_ago, today);
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
  };
  
  return (
    <div>
      {ids.map((id) => {
        return (
          <div key={id}>
            <h2>Station ID: {id}</h2>
            <div className="buttons text-center">
              <button
                value={"sunHours"}
                className="w-32 mx-5 p-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={(e) => handleClick(e, id)}
              >
                Sun Hours
              </button>
              <button
                value={"temperature"}
                className="w-32 mx-5 p-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={(e) => handleClick(e, id)}
              >
                Temperature
              </button>
              <button
                value={"humidity"}
                className="w-32 mx-5 p-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={(e) => handleClick(e, id)}
              >
                Humidity
              </button>
            </div>
            <div className="chart-container" style={{ height: 400 }}>
              <canvas id={`chart-${id}`}></canvas>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function renderStationData(
  data: Array<StationData>,
  label: string,
  id: string,
  index: number,
) {
  const canvas = document.getElementById(`chart`) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    const labels = data[index].map((item) =>
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

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: chartData,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        interaction: {
          intersect: false,
          mode: "index",
        },
        aspectRatio: 2,
        animation: {
          duration: 2000,
          easing: "easeOutQuint",
          delay: 0,
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            position: "nearest",
            callbacks: {
              label: (context: any) => {
                return `${context.dataset.label}: ${context.parsed.y}`;
              },
            },
          },
        },
      },
    });
  } else {
    console.error("Cannot create chart, canvas context is null");
  }
}

export default function StationPage() {
  const router = useRouter();
  const { ids } = router.query;
  const idArray = ids ? (ids as string).split('-') : [];
  
  return (
    <>
      <div className="bg-white min-h-screen p-6">
        <div className="buttons-chart flex flex-col flex-wrap">
          {idArray.length ? <CreateGraph ids={idArray} /> : <h1>Loading...</h1>}
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
