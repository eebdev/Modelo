import { ReactNode } from "react";

export default function Card({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded shadow p-2 h-80">
      <div className="border-b border-gray-800 p-3">
        <h5 className="font-bold uppercase text-gray-600">{title}</h5>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
