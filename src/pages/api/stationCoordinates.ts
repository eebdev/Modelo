import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function getStationCoordinates(
  req: NextApiRequest, 
  res: NextApiResponse<{ message: string; data?: { longitude: number; latitude: number } }>
): Promise<void> {
  if (req.method === "GET") {
    if (req.query.id !== undefined) {
      const stationName = parseInt(req.query.id as string, 10);

      const station = await prisma.station.findUnique({
        where: {
          name: stationName,
        },
        select: {
          longitude: true,
          latitude: true,
        },
      });

      if (station) {
        res.status(200).json({
            data: { longitude: station.longitude, latitude: station.latitude },
            message: ""
        });
      } else {
        res.status(404).json({ message: "Station not found" });
      }
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: "Method not allowed" });
  }
}
