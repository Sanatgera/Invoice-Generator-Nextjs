// src/lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? '';
if (!MONGODB_URI || MONGODB_URI=='') {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Use a cached connection in development to avoid creating
 * multiple connections during HMR / serverless re-deploys.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongooseInstance) => mongooseInstance);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
