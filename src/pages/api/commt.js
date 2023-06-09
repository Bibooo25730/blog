import { stat } from "fs";
import clientPromise from "../../../lib/mongdb";

export default async function handler(req, res) {

  const {pathname} = req.query;
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("comment").insertOne(bodyObject);
      res.json({status:200});
      break;
    case "GET":
      const allPosts = await db.collection("comment").find({"path":pathname}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}
