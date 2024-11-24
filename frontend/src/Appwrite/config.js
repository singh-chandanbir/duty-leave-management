import { Client, Account, ID, Storage, Databases, Query } from "appwrite";
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("673f22a40039e4fa635e");

const account = new Account(client);
const storage = new Storage(client);
const database = new Databases(client);

const bucketId = "673f3831001883f01bd7";
const databaceId = "673f35c1002500370a56";
const collectionId = "673f35c8002f5cb412da";

export {
  client,
  account,
  ID,
  storage,
  bucketId,
  databaceId,
  collectionId,
  database,
  Query,
};
