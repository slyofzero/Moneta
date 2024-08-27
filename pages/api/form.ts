// pages/api/logBody.js

import { addDocument, getDocument } from "@/firebase";
import { StoredForm } from "@/types/Form";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { data } = JSON.parse(req.body);

      addDocument<StoredForm>({ collectionName: "forms", data });

      // You can send a response back to the client
      res.status(200).json({ message: "Successful form submission", data });
    } catch (error) {
      // eslint-disable-next-line
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const { user } = req.query;

      const userForms = await getDocument<StoredForm>({
        collectionName: "forms",
        queries: [["user", "==", user]],
      });

      // You can send a response back to the client
      res.status(200).json({ message: "Got user forms", data: userForms });
    } catch (error) {
      // eslint-disable-next-line
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
