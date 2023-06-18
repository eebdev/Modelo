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

	return (
		<div className="font-sans leading-normal tracking-normal h-screen flex flex-col">
			<Navbar />
			<div className="container mx-auto px-4 pt-6 flex-grow">
			</div>
			<Footer />
		</div>
	)
}

const CoordinatesMap = dynamic(() => import("@components/CoordinatesMap"), {
  ssr: false,
});

const GraphSection = ({ data }: { data: StationData[] }) => {
  if (data.length === 0) {
    return <div>Loading...</div>;
  }
  console.log(data);
  const temperature = data.map((d) => ({
    datetime: new Date(d.datetime).toLocaleTimeString(),
    uv: parseFloat(d.temp),
  }));
  const humidity = data.map((d) => ({
    datetime: new Date(d.datetime).toLocaleTimeString(),
    uv:
      100 *
      (Math.exp((17.625 * Number(d.dewp) / (243.04 + Number(d.dewp)) /
        Math.exp((17.625 * Number(d.temp)) / (243.04 + Number(d.temp)))))),
  }));
  const blueSky = data.map((d) => ({
    datetime: new Date(d.datetime).toLocaleTimeString(),
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
    </div>
  </div>
);