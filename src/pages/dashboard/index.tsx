import Navbar from "@components/navbar";
import Footer from "@components/footer";
import Graph from "@components/graph";
import dynamic from "next/dynamic";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { clientCredentials } from "@config/firebase";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Card from "@components/Card";

const CoordinatesMap = dynamic(() => import("@components/CoordinatesMap"), {
  ssr: false,
});

const app = initializeApp(clientCredentials);
const auth = getAuth(app);

export default function Home() {
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);

  // useEffect(() => {
  //   if (!loading && user == null) {
  //     router.push("/");
  //   }
  // }, []);

  if (loading) return <div>Loading...</div>;


  return (
    <div className="font-sans leading-normal tracking-normal h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 pt-6 flex-grow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <GraphSection />
            <div className="mt-4">
              <CoordinatesMap defaultCenter={[51.505, -0.09]} />
            </div>
          </div>
          <div className="md:w-1/4">
            <MessageSection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const GraphSection = () => (
  <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
    <Card title="Temperature">
      <Graph />
    </Card>
    <Card title="Humidity">
      <Graph />
    </Card>
    <Card title="Pressure">
      <Graph />
    </Card>
  </div>
);

const MessageSection = () => (
  <div className="bg-modelo-yellow border border-modelo-red rounded shadow h-full">
    <div className="border-b border-modelo-red p-3">
      <h5 className="font-bold uppercase text-modelo-blue">Messages</h5>
    </div>
  </div>
);