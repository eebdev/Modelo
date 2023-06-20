// Importeer de benodigde modules en database query-functie
import { NextApiRequest, NextApiResponse } from "next";
import { getStationData, getStationDataByDateRange, getDataByDateRange } from "@database/queries";
import { StationData } from "@ctypes/types";
import { station_data } from "@prisma/client";

/**
 * De dataReceiver functie is een async handler voor NextApiRequest en NextApiResponse.
 * Het verwerkt inkomende POST-verzoeken met weerdata, slaat de gegevens op in de database en retourneert een passende HTTP-status.
 * @param {NextApiRequest} req - Het NextApiRequest object.
 * @param {NextApiResponse} res - Het NextApiResponse object.
 * @returns {Promise<void>} - Een lege promise.
 */

export default async function dataReceiver(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; data?: station_data[] }>
): Promise<void> {
  // Controleer of het verzoek een POST-methode is
  if (req.method === "GET") {
    if (
      req.query.start !== undefined &&
      req.query.end !== undefined
    ) {
      if (req.query.id !== undefined) {
      const id = Number(req.query.id);
      const start = new Date(req.query.start as string);
      const end = new Date(req.query.end as string);
      const data = await getStationDataByDateRange(id, start, end);
      res.status(200).json({ message: "OK", data: data });
    } else {
      const start = new Date(req.query.start as string);
      const end = new Date(req.query.end as string);
      const data = await getDataByDateRange(start, end);
      res.status(200).json({ message: "OK", data: data });
    }}
    else {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    // Als de verzoekmethode geen POST is, stuur dan een 'Method Not Allowed' status en een bericht
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: "Method not allowed" });
  }
}
