import { Client } from "react-native-appwrite";

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
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject("455x34dfkj") // Your project ID
  .setPlatform("com.example.myappwriteapp"); // Your application ID or bundle ID.
