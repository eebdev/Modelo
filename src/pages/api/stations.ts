import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function stationSearch(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; data?: station_data[] }>
): Promise<void> {
  // Controleer of het verzoek een GET-methode is
  if (req.method === "GET") {
    if (req.query.search !== undefined) {
      const search = req.query.search as string;

      const data = await prisma.geolocation.findMany({
        where: {
          OR: [
            {
              country: {
                contains: search,
              },
            },
            {
              city: {
                contains: search,
              },
            },
          ],
        },
        select: {
          station_name: true,
          country: true,
          city: true,
          station: true,
        },
      });

      // Formatteer de uitvoer voor consistentie
      const formattedData = data.map((station) => ({
        name: station.station?.name,
        country: station.country,
        city: station.city,
      }));

      res.status(200).json(formattedData);
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    // Als de verzoekmethode geen GET is, stuur dan een 'Method Not Allowed' status en een bericht
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: "Method not allowed" });
  }
}
