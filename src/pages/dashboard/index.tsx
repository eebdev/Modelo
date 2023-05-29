import Navbar from "@components/navbar";
import Footer from "@components/footer";
import dynamic from "next/dynamic";

const CoordinatesMap = dynamic(() => import("@components/CoordinatesMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="font-sans leading-normal tracking-normal h-screen">
      <Navbar />
      {/* <!--Container--> */}
      <div className="container w-full mx-auto pt-20 h-1/8">
        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-modelo-brown leading-normal h-full flex">
          <div className="flex-1">
            {/* <!--Console Content--> */}
            <div className="grid grid-cols-3 gap-4 h-1/3">
              <div className="p-3">
                {/* <!--Graph Card--> */}
                <div className="bg-modelo-yellow border border-modelo-red rounded shadow h-full">
                  <div className="border-b border-modelo-red p-3">
                    <h5 className="font-bold uppercase text-modelo-blue">
                      Graph
                    </h5>
                  </div>
                </div>
                {/* <!--/Graph Card--> */}
              </div>
              <div className="p-3">
                {/* <!--Graph Card--> */}
                <div className="bg-modelo-yellow border border-modelo-red rounded shadow h-full">
                  <div className="border-b border-modelo-red p-3">
                    <h5 className="font-bold uppercase text-modelo-blue">
                      Graph
                    </h5>
                  </div>
                </div>
                {/* <!--/Graph Card--> */}
              </div>
              <div className="p-3">
                {/* <!--Graph Card--> */}
                <div className="bg-modelo-yellow border border-modelo-red rounded shadow h-full">
                  <div className="border-b border-modelo-red p-3">
                    <h5 className="font-bold uppercase text-modelo-blue">
                      Graph
                    </h5>
                  </div>
                </div>
                {/* <!--/Graph Card--> */}
              </div>
            </div>

            <div className="h-1/2 mt-4 p-3">
              {/* <!--Map Card--> */}
              <CoordinatesMap defaultCenter={[51.505, -0.09]} />
              {/* <!--/Map Card--> */}
            </div>
            {/* <!--/ Console Content--> */}
          </div>

          <div className="w-1/4 p-3 h-5/6">
            {/* <!--Message Card--> */}
            <div className="bg-modelo-yellow border border-modelo-red rounded shadow h-full">
              <div className="border-b border-modelo-red p-3">
                <h5 className="font-bold uppercase text-modelo-blue">
                  Messages
                </h5>
              </div>
            </div>
            {/* <!--/Message Card--> */}
          </div>
        </div>
      </div>
      {/* <!--/container--> */}
      <Footer />
    </div>
  );
}
