import { Client, Account, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.APP_WRITE_ENDPOINT)
  .setProject(process.env.APP_WRITE_PROJECT_ID);

const account = new Account(client);

export { client, account };
