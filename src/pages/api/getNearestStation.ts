import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getNearestStation(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; data?: any }>
): Promise<void> {
  // Check if the request is a GET method
  if (req.method === "GET") {
    if (req.query.lat !== undefined && req.query.lon !== undefined) {
      const lat = Number(req.query.lat);
      const lon = Number(req.query.lon);

      try {
        const nearestStations = await prisma.station.findMany();
        
        // Calculate the distances for each station
        nearestStations.forEach(station => {
          station.distance = Math.sqrt(
            Math.pow(station.latitude - lat, 2) +
            Math.pow(station.longitude - lon, 2)
          );
        });

        // Sort the stations by distance (closest first)
        nearestStations.sort((a, b) => a.distance - b.distance);

        // Send the closest station as a response
        res.status(200).json({ message: "OK", data: nearestStations[0].name });
      } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
      }
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    // If the request method is not GET, send a 'Method Not Allowed' status and message
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: "Method not allowed" });
  }
}
