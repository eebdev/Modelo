import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { station_data } from "@prisma/client";

const prisma = new PrismaClient();

export default async function stationSearch(
  req: NextApiRequest, 
    res: NextApiResponse<{
        message: string; data?: station_data[]
    }>
): Promise<void> {
  // Controleer of het verzoek een GET-methode is
  if (req.method === "GET") {
      if (req.query.id !== undefined) {
        const id = Number(req.query.id);

        const data = await prisma.nearestlocation.findFirst({
            where: {
                station_name: id
            },
            select: {
                name: true,
            }
        });
    
                

      res.status(200).json({ message: "OK", data: data });
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    // Als de verzoekmethode geen GET is, stuur dan een 'Method Not Allowed' status en een bericht
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: "Method not allowed" });
  }
}
