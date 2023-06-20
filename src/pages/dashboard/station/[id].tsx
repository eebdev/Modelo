import Navbar from "@components/navbar";
import Footer from "@components/footer";
import Graph from "@components/graph";
import dynamic from "next/dynamic";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { clientCredentials } from "@config/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "@components/Card";
import { StationData } from "@ctypes/types";

const app = initializeApp(clientCredentials);
const auth = getAuth(app);

export default function Station() {
  const router = useRouter();
  const { id } = router.query;

  const [user, loading, error] = useAuthState(auth);

  const [data, setData] = useState<StationData[]>([]);

  const [coords, setCoords] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/");
    }

    if (user) {
      // start is 3 days ago
      const start = new Date();
      start.setDate(start.getDate() - 365);
      const end = new Date();

      if (!id) {
        return;
      }
      fetch("/api/data?id=" + id + "&start=" + start + "&end=" + end)
        .then((res) => res.json())
        .then((data) => setData(data.data));

      // fetch("/api/stationCoordinates?id=" + id)
      //   .then((res) => res.json())
      //   .then((data) => setCoords([data.latitude, data.longitude]));
    }
  }, [user, loading, id]);

  return (
    <div className="font-sans leading-normal tracking-normal h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 pt-6 flex-grow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <GraphSection data={data} />
            <div className="mt-4">
              {/* <CoordinatesMap defaultCenter={[coords[0], coords[1]]} /> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const CoordinatesMap = dynamic(() => import("@components/CoordinatesMap"), {
  ssr: false,
});

const GraphSection = ({ data }: { data: StationData[] }) => {
  if (data.length === 0) {
    return <div>Loading...</div>;
  }
  const temperature = data.map((d) => ({
    name: new Date(d.datetime).toLocaleDateString(),
    uv: parseFloat(d.temp),
  }));
  const humidity = data.map((d) => ({
    name: new Date(d.datetime).toLocaleDateString(),
    uv:
      100 *
      Math.exp(
        (17.625 * Number(d.dewp)) /
          (243.04 + Number(d.dewp)) /
          Math.exp((17.625 * Number(d.temp)) / (243.04 + Number(d.temp)))
      ),
  }));
  const blueSky = data.map((d) => ({
    name: new Date(d.datetime).toLocaleDateString(),
    uv: parseFloat(d.cldc),
  }));
  const windSpeed = data.map((d) => ({
    name: new Date(d.datetime).toLocaleDateString(),
    uv: parseFloat(d.wdsp),
  }));
  const precipitation = data.map((d) => ({
    name: new Date(d.datetime).toLocaleDateString(),
    uv: parseFloat(d.prcp),
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
    </div>
  );
};
