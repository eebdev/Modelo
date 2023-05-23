import { NextApiRequest, NextApiResponse } from "next";
import { getHumidity } from "@database/queries";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const id: number = +req.query.id;
        const today = new Date();
        const three_days_ago = new Date(today.getDate() - 3);

        getHumidity(id, three_days_ago, today).then((result) => {
            console.log(result);
            res.status(200).json(result);
        }
        ).catch((error) => {
            res.status(500).json({ error });
        }
        );
    }
}