import { useState, useEffect } from "react";
import { StationData } from "@ctypes/types";

export function useStationFetch(
  station_name: string,
  start_date?: Date,
  end_date?: Date
): StationData | undefined {
  let datapunten = [];
  let url = "";

  if (start_date && end_date) {
    url = `/api/weatherdata?id=${station_name}&start_date=${start_date}&end_date=${end_date}`;
  } else {
    url = `/api/weatherdata?id=${station_name}`;
  }

    if (!station_name) return undefined;

    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      datapunten = data.data;
    };

    fetchData();

  return datapunten;
}