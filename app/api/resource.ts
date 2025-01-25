import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const resource = req.body;

    // Define the path to the data.json file
    const filePath = path.join(process.cwd(), "data", "../../../public/data.json");

    try {
      // Read the existing data from the JSON file
      const fileData = fs.readFileSync(filePath, "utf-8");
      const resources = JSON.parse(fileData);

      // Add the new resource to the array
      resources.push(resource);

      // Write the updated data back to the JSON file
      fs.writeFileSync(filePath, JSON.stringify(resources, null, 2), "utf-8");

      res.status(200).json({ success: true, message: "Resource added successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to add resource." });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed." });
  }
}
