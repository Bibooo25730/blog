import { stat } from "fs";
import clientPromise from "../../../lib/mongdb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  switch (req.method) {
    case "POST":
      console.log(req.body)
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("comment").insertOne(bodyObject);
      res.json({status:200});
      break;
    case "GET":
      const allPosts = await db.collection("comment").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}
