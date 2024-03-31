import fs from "fs";
import {
  getNextId,
  getLocaleTime,
  createFile,
  saveData,
  readData,
} from "../../utils.js";

class ChatManager {
  static #path = "./mock/chats.json";
  constructor() {
    this.chats = [];
    ChatManager.#path;
  }

  saveMessage = async ({user, message, hour}) => {
    try {
      const fileExist = fs.existsSync(ChatManager.#path);

      if (!fileExist) {
        await createFile(ChatManager.#path);
      }

      const chats = await this.getMessages();

      const chat = {
        id: getNextId(ChatManager.#path),
        user,
        message,
        hour,
      };

      chats.push(chat);
      await saveData(chats, ChatManager.#path);
    } catch (error) {
      console.log(`${error} - ${getLocaleTime()}`);
      return error;
    }
  };

  getMessages = async () => {
    try {
      const fileExist = fs.existsSync(ChatManager.#path);

      if (!fileExist) {
        await createFile(ChatManager.#path);
      }

      const chats = await readData(ChatManager.#path);

      return chats;
    } catch (error) {
      console.log(`${error} - ${getLocaleTime()}`);
      return error;
    }
  };
}

export default ChatManager;