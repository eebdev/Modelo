import Navbar from "@components/navbar";
import Footer from "@components/footer";
import Graph from "@components/graph";
import dynamic from "next/dynamic";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { clientCredentials } from "@config/firebase";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "@components/Card";
import { StationData } from "@ctypes/types";
import { saveAs } from "file-saver";

const app = initializeApp(clientCredentials);
const auth = getAuth(app);

export default function Station() {
  const router = useRouter();
  const { id } = router.query;

  const [user, loading, error] = useAuthState(auth);

  const [coords, setCoords] = useState<[number, number]>([0, 0]);

  const [data, setData] = useState<StationData[]>([]);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/");
    }

    if (user) {
      // start is 3 days ago
      const start = new Date();
      start.setDate(start.getDate() - 3);
      const end = new Date();

      if (!id) {
        return;
      }
      fetch("/api/data?id=" + id + "&start=" + start + "&end=" + end)
        .then((res) => res.json())
        .then((data) => setData(data.data));

      fetch("/api/stationCoordinates?id=" + id)
        .then((res) => res.json())
        .then((data) => setCoords([data.data.latitude, data.data.longitude]));
    }
  }, [user, loading, id]);

  function handleDownload(
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();

    const blob = new Blob([JSON.stringify(data)], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "data.json");
  }

  const CoordinatesMap = dynamic(() => import("@components/CoordinatesMap"), {
    ssr: false,
  });

  const Map = () => {
    if (coords[0] === 0 && coords[1] === 0) {
      return <div>Loading...</div>;
    } else if (coords[0] === undefined && coords[1] === undefined) {
      return <div>Coordinates not found</div>;
    }
    return <CoordinatesMap defaultCenter={coords} setStationID={function (value: SetStateAction<string>): void {
      throw new Error("Function not implemented.");
    } } defaultZoom={13} />;
  };

  return (
    <div className="font-sans leading-normal tracking-normal h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 pt-6 flex-grow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <button onClick={handleDownload} className="bg-modelo-blue text-xl text-white px-2 py-1 m-5 rounded">
                Download data 
            </button>
            <GraphSection data={data} />
            
            <div className="mt-4">
              <Map />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const GraphSection = ({ data }: { data: StationData[] }) => {
  if (data.length === 0) {
    return <div>Loading...</div>;
  }
  const temperature = data.map((d) => ({
    name: new Date(d.datetime).toLocaleString(),
    uv: parseFloat(d.temp),
  }));
  const humidity = data.map((d) => ({
    name: new Date(d.datetime).toLocaleString(),
    uv:
      100 *
      Math.exp(
        (17.625 * Number(d.dewp)) /
          (243.04 + Number(d.dewp)) /
          Math.exp((17.625 * Number(d.temp)) / (243.04 + Number(d.temp)))
      ),
  }));
  const blueSky = data.map((d) => ({
    name: new Date(d.datetime).toLocaleString(),
    uv: parseFloat(d.cldc),
  }));
  const windSpeed = data.map((d) => ({
    name: new Date(d.datetime).toLocaleString(),
    uv: parseFloat(d.wdsp),
  }));
  const precipitation = data.map((d) => ({
    name: new Date(d.datetime).toLocaleString(),
    uv: parseFloat(d.prcp),
  }));
  const dewpoint = data.map((d) => ({
    name: new Date(d.datetime).toLocaleString(),
    uv: parseFloat(d.dewp),
  }));

  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
      <Card title="Temperature">
        <Graph
          data={temperature}
          title="Temperature"
          color="#F59E0B"
          unit="°C"
        />
      </Card>
      <Card title="Humidity">
        <Graph data={humidity} title="Humidity" color="#10B981" unit="%" />
      </Card>
      <Card title="Blue Sky">
        <Graph data={blueSky} title="Blue Sky" color="#3B82F6" unit="%" />
      </Card>
      <Card title="Wind Speed">
        <Graph data={windSpeed} title="Wind Speed" color="#EF4444" unit="m/s" />
      </Card>
      <Card title="Precipitation">
        <Graph
          data={precipitation}
          title="Precipitation"
          color="#6366F1"
          unit="mm"
        />
      </Card>
      <Card title="Dewpoint">
        <Graph data={dewpoint} title="Dewpoint" color="#8B5CF6" unit="°C" />
      </Card>
    </div>
  );
};
