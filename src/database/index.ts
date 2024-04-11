import mongoose from "mongoose";

//todo: change to MONDODB_GLOBAL_URL
const mongodb_url = process.env.MONGODB_GLOBAL_URL!;

let cached = (global as any).mongoose || { connection: null, promise: null };

export const connectToDb = async () => {
  if (cached.connection) return cached.connection;
  if (!mongodb_url) throw new Error("MONGODB URL not found");

  cached.promise =
    cached.promise ||
    mongoose.connect(mongodb_url, {
      dbName: "events_db",
      bufferCommands: false,
    });

  cached.connection = await cached.promise;
  console.log("connected to db!");
  return cached.connection;
};
