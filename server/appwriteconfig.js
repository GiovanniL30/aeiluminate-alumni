import { Client, Account, Users } from "node-appwrite";

const client = new Client()
  .setEndpoint(process.env.APP_WRITE_ENDPOINT)
  .setProject(process.env.APP_WRITE_PROJECT_ID);

const account = new Account(client);
const users = new Users(client);

export { client, account, users };
