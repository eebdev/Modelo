import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStationData(station_name: number) {
  return prisma.station_data.findFirst({
    where: {
      station_name: station_name,
    },
    orderBy: {
      datetime: "desc",
    },
  });
}

export async function getStationDataByDateRange(
  station_name: number,
  start_date: Date,
  end_date: Date
) {
  return prisma.station_data.findMany({
    where: {
      station_name: station_name,
      datetime: {
        gte: start_date,
        lte: end_date,
      },
    },
  });
}

export async function getDataByDateRange(
  start_date: Date,
  end_date: Date
) {
  return prisma.station_data.findMany({
    where: {
      datetime: {
        gte: start_date,
        lte: end_date,
      },
    },
  });
}

export async function getWeatherStations() {
  return prisma.station_data.findMany({
    select: {
      station_name: true,
    },
    orderBy: {
      station_name: "asc",
    },
    distinct: ["station_name"],
  });
}

export async function getCoordinates(station_name: number) {
  return prisma.station.findFirst({
    where: {
      name: station_name,
    },
    select: {
      latitude: true,
      longitude: true,
      name: true,
    },
  });
}
