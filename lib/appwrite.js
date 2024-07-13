import { Client, Account } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.primedev.aora",
  projectId: "668d8de7002dfe566972",
  storageId: "668d97310027adccd808",
  databaseId: "668d948600101acbf08f",
  userCollectionId: "668d94a10035da3dfc46",
  videoCollectionId: "668d94d5002670e24a15",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);

// Register User

const CreateUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log({ response });
    },
    function (error) {
      console.log({ error });
    }
  );
};
export default CreateUser;