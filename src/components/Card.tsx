import { ReactNode, useRef } from "react";

export default function Card({ children, title }: { children: ReactNode; title: string; }) {
  const cardRef = useRef<HTMLElement>(null);

  const handleFullscreen = () => {
    if (cardRef.current) {
      cardRef.current.requestFullscreen();
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded shadow p-2 h-80" ref={cardRef}>
      <div className="border-b border-gray-800 p-3 flex justify-between items-center">
        <h5 className="font-bold uppercase text-gray-600">{title}</h5>
        <button onClick={handleFullscreen} className="text-gray-600 hover:text-gray-500 duration-200"> Fullscreen</button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
