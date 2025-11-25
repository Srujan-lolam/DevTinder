const { MongoClient } = require("mongodb");
const URL = "";
const client = new MongoClient(URL);
const dbName = "NamastheNode";
async function main() {
  await client.connect();
  console.log("connection established successfully");
  const db = client.db(dbName);
  const collection = db.collection("User");
  const data = {
    firstName: "Rohith",
    lastName: "Sharma",
    city: "Mumbai",
  };
  //   const insertResult = await collection.insertMany([data]);
  //   console.log("insertResult = ", insertResult);
  //   const findResult = await collection.find({}).toArray();
  //   console.log(findResult);

  //   const countResult = await collection.countDocuments({});
  //   console.log("countResult = ", countResult);
  return "done";
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
