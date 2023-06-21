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
import { saveAs } from "file-saver";

const CoordinatesMap = dynamic(() => import("@components/CoordinatesMap"), {
  ssr: false,
});

const app = initializeApp(clientCredentials);
const auth = getAuth(app);

export default function Home() {
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);

  const [data, setData] = useState<StationData[]>([]);
  const [stationID, setStationID] = useState<string>("766790");
  const [allData, setAllData] = useState<StationData[]>([]);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/");
    }
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      // start is 3 days ago
      const start = new Date();
      start.setDate(start.getDate() - 3);
      const end = new Date();

      fetch("/api/data?id=" + stationID + "&start=" + start + "&end=" + end)
        .then((res) => res.json())
        .then((data) => setData(data.data));
    }
  }, [user, stationID]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  function handleDownload(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    
    const start = new Date();
    start.setDate(start.getDate() - 3);
    const end = new Date();

    fetch("/api/data?start=" + start + "&end=" + end).then((res) => res.json()).then((data) => setAllData(data.data));
    const blob = new Blob([JSON.stringify(allData)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "data.txt");
  }

  return (
    <>
      {user && (
        <div className="font-sans leading-normal tracking-normal h-screen flex flex-col">
          <Navbar />
          <div className="container mx-auto px-4 pt-6 flex-grow">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <GraphSection data={data} />
                <button onClick={handleDownload} className="bg-modelo-blue text-xl text-white px-2 py-1 m-5 rounded">
                  Download data 
                </button>
                <div className="mt-4">
                  <CoordinatesMap defaultCenter={[19.454823, -99.131099]} setStationID={setStationID} defaultZoom={10}/>
                </div>
              </div>
              <div className="md:w-1/4">
                <MessageSection />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

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
      (Math.exp((17.625 * Number(d.dewp) / (243.04 + Number(d.dewp)) /
        Math.exp((17.625 * Number(d.temp)) / (243.04 + Number(d.temp)))))),
  }));
  const blueSky = data.map((d) => ({
    name: new Date(d.datetime).toLocaleDateString(),
    uv: parseFloat(d.cldc),
  }));

  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
      <Card title="Temperature">
        <Graph data={temperature} />
      </Card>
      <Card title="Humidity">
        <Graph data={humidity} />
      </Card>
      <Card title="Blue Sky">
        <Graph data={blueSky} />
      </Card>
    </div>
  );
};
const MessageSection = () => (
  <div className="bg-modelo-yellow border border-modelo-red rounded shadow h-full">
    <div className="border-b border-modelo-red p-3">
      <h5 className="font-bold uppercase text-modelo-blue">Messages</h5>

      <div className="flex justify-between items-center pb-5">
        <h2 className="text-xl text-modelo-blue">Cloud coverage is high <br />{">"} 80%</h2>
        <button className="bg-modelo-blue text-white px-2 py-1 rounded">
          View
        </button>
      </div>
      <div className="flex justify-between items-center pb-5">
        <h2 className="text-xl text-modelo-blue">High chance of rain <br />{">"} 92%</h2>
        <button className="bg-modelo-blue text-white px-2 py-1 rounded">
          View
        </button>
      </div>
    </div>
  </div>
);
