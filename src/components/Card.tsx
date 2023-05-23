import { ReactNode } from "react";

export default function Card({
  children,
  title,
  value,
  color,
}: {
  children: ReactNode;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded shadow p-2">
      <div className="flex flex-row items-center">
        <div className="flex-shrink pr-4">
          <div className="rounded p-3" style={{ backgroundColor: color }}>
            {children}
          </div>
        </div>
        <div className="flex-1 text-right md:text-center">
          <h5 className="font-bold uppercase text-gray-400">{title}</h5>
          <h3 className="font-bold text-3xl text-gray-600">
            {value}{" "}
            <span style={{ color: color }}>
              <i className="fas fa-exchange-alt"></i>
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}
