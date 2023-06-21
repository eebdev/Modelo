import { ReactNode, useEffect, useRef, useState } from "react";

function launchIntoFullscreen(element: { requestFullscreen: () => void; mozRequestFullScreen: () => void; webkitRequestFullscreen: () => void; msRequestFullscreen: () => void; }) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

export default function Card({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (cardRef.current) {
      if (!fullscreen) {
        launchIntoFullscreen(cardRef.current);
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div
      className="bg-gray-900 border border-gray-800 rounded shadow p-2 h-80"
      ref={cardRef}
    >
      <div className="border-b border-gray-800 p-3 flex justify-between items-center">
        <h5 className="font-bold uppercase text-gray-600">{title}</h5>
        <button
          onClick={toggleFullscreen}
          className="text-gray-600 hover:text-gray-500 duration-200"
        >
          {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>
      <div className="p-1">{children}</div>
    </div>
  );
}
