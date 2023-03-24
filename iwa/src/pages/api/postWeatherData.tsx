// Importeer de benodigde modules en database query-functie
import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../database";

// Definieer een type voor de weerdata
interface WeatherData {
  STN: string;
  DATE: string;
  TIME: string;
  TEMP: number;
  DEWP: number;
  STP: number;
  SLP: number;
  VISIB: number;
  WDSP: number;
  PRCP: number;
  SNDP: number;
  FRSHTT: string;
  CLDC: number;
  WNDDIR: number;
}

/**
 * Valideert of de weerdata voldoet aan de verwachte voorwaarden.
 * @param {WeatherData} data - Het dataobject met weerinformatie.
 * @returns {boolean} - Geeft 'true' terug als de data geldig is, anders 'false'.
 */
function isValidWeatherData(data: WeatherData): boolean {
  return !Object.values(data).includes('None');
}

/**
 * Slaat de weerdata op in de database.
 * @param {WeatherData} data - Het dataobject met weerinformatie.
 */
async function saveToDatabase(data: WeatherData) {
  // Destructureer de kolommen uit het dataobject
  const {
    STN,
    DATE,
    TIME,
    TEMP,
    DEWP,
    STP,
    SLP,
    VISIB,
    WDSP,
    PRCP,
    SNDP,
    FRSHTT,
    CLDC,
    WNDDIR,
  } = data;

  // Combineer de datum- en tijdvelden tot een enkele datetime-waarde
  const datetime = `${DATE} ${TIME}`;

  // Voer een query uit om de weerdata in de database op te slaan
  await query(
    `
    INSERT INTO station_data (station_name, datetime, temp, dewp, stp, slp, visib, wdsp, prcp, sndp, frshtt, cldc, wnddir)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      STN,
      datetime,
      TEMP,
      DEWP,
      STP,
      SLP,
      VISIB,
      WDSP,
      PRCP,
      SNDP,
      FRSHTT,
      CLDC,
      WNDDIR,
    ]
  );
}

/**
 * De dataReceiver functie is een async handler voor NextApiRequest en NextApiResponse.
 * Het verwerkt inkomende POST-verzoeken met weerdata, slaat de gegevens op in de database en retourneert een passende HTTP-status.
 * @param {NextApiRequest} req - Het NextApiRequest object.
 * @param {NextApiResponse} res - Het NextApiResponse object.
 * @returns {Promise<void>} - Een lege promise.
 */
export default async function dataReceiver(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  // Controleer of het verzoek een POST-methode is
  if (req.method === "POST") {
    try {
      // Parse de ontvangen data
      const receivedData = JSON.parse(req.body);

      // Haal de weerdata-array op
      const data = receivedData.WEATHERDATA;

      // Verwerk elk item in de weerdata-array
      for (const item of data) {
        // Controleer of er een kolom in het item 'None' bevat en sla het item over als dat het geval is
        if (isValidWeatherData(item)) {
          // Sla het item op in de database
          await saveToDatabase(item);
        } else {
          // Log een foutmelding als het item niet geldig is
          // console.log('Skipping invalid item:', item);
        }
      }
      // Stuur een succesvolle HTTP-status en bericht terug
      res.status(200).json({ message: "Data received and saved successfully" });
    } catch (error) {
      // Log en retourneer een foutmelding en HTTP-status als er een fout optreedt bij het opslaan van de gegevens
      console.error("Error saving data:", error);      
      if (error instanceof SyntaxError) {
        // Als de fout een SyntaxError is, stuur dan een 'Bad Request' status en een bericht
        res.status(400).json({ message: 'Invalid JSON data' });
      } else {
        // Als de fout geen SyntaxError is, stuur dan een 'Internal Server Error' status en een bericht        
        res.status(500).json({ message: "Error saving data to database" });
      }
    }
  } else {
    // Als de verzoekmethode geen POST is, stuur dan een 'Method Not Allowed' status en een bericht
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: "Method ${req.method} not allowed" });
  }
}
