import { StationData } from "@ctypes/types";

export async function useStationFetch (
  station_name: string,
  start_date?: Date,
  end_date?: Date
): Promise<StationData | undefined> {
  let url = "";

  if (start_date && end_date) {
    url = `/api/weatherdata?id=${station_name}&start_date=${start_date}&end_date=${end_date}`;
  } else {
    url = `/api/weatherdata?id=${station_name}`;
  }

  const res = await fetch(url);
  const data = await res.json();
  return data.data;
}
