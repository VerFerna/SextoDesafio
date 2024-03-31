import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

const url = `mongodb+srv://verferna:verferna123@margaritamaia.4pohsdq.mongodb.net/`;

mongoose.connect(url);

const mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "MongoDB connection error:"));
mongodb.once("open", () => console.log("Connected to MongoDB successfully."));

process.on("SIGINT", () => {
  mongodb.close(() => {
    console.log("Connection to MongoDB closed");
    process.exit(0);
  });
});

const sessions = session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: url,
    dbName: "MargaritaMaia",
  }),
  ttl: 100,
});

export default sessions;

