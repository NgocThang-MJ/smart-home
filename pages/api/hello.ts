// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../util/mongodb";
import NextCors from "nextjs-cors";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //await NextCors(req, res, {
  //method: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  //origin: "*",
  //});

  //const { db } = await connectToDatabase();

  //const kitchen = await db.collection("kitchen").find({}).toArray();
  //console.log(kitchen);
  res.status(200).json({ name: "John Doe" });
}
