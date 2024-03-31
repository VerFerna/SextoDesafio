import { MessageModel } from "../models/message.model.js";

class ChatManager {
  saveMessage = async (message) => {
    try {
      const newMessage = await MessageModel.create(message);

      console.log("Message saved");
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getMessages = async () => {
    try {
      const messages = await MessageModel.find();

      return messages;
    } catch (error) {
      console.log("No messages");
      return [];
    }
  };
}

export default ChatManager;
