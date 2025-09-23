import { StreamChat } from "stream-chat";
import { ENV } from "../config/env.js";

const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_SECRET_KEY);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log("Stream user upserted successfully:", userData.name);
    return userData;
  } catch (error) {
    console.log("Error upserting Stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log("Stream user deleted successfully:", userId);
  } catch (error) {
    console.error("Error deleting Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (error) {
    console.log("Error generating Stream token:", error);
    return null;
  }
};
export const addUserToPublicChannels = async (newUserId) => {
  try {
    const publicChannels = await streamClient.queryChannels({ discoverable: true });
    
    for (const channel of publicChannels) {
      try {
        await channel.addMembers([newUserId]);
      } catch (error) {
        console.error(`Failed to add user ${newUserId} to channel ${channel.id}:`, error);
        // Continue with other channels rather than failing completely
      }
    }
  } catch (error) {
    console.error("Error querying public channels:", error);
    throw error;
  }
}; 