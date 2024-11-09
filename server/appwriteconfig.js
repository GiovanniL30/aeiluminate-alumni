import { Client, Account } from "appwrite";

/**
 * Singleton Instance for connecting to the apprwrite project
 *
 */
class AppWriteSingleton {
  constructor() {
    if (!AppWriteSingleton.instance) {
      this.client = new Client()
        .setEndpoint(process.env.APP_WRITE_ENDPOINT)
        .setProject(process.env.APP_WRITE_PROJECT_ID);

      this.account = new Account(this.client);
      AppWriteSingleton.instance = this;
    }

    return AppWriteSingleton.instance;
  }

  getClient() {
    return this.client;
  }

  getAccount() {
    return this.account;
  }
}

const appWriteInstance = new AppWriteSingleton();
Object.freeze(appWriteInstance);

export default appWriteInstance;
