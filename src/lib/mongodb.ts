import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI non défini");
}

// 👇 cache global (important pour Next.js)
let cached = global.mongoose as {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const options: mongoose.ConnectOptions = {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 60000,
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI!, options);
    }

    cached.conn = await cached.promise;

    // ✅ listeners ajoutés UNE SEULE FOIS
    if (mongoose.connection.listenerCount("error") === 0) {
        mongoose.connection.on("error", (err) => {
            console.error("Erreur MongoDB:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB déconnecté");
        });

        console.log("Connecté à MongoDB");
    }

    return cached.conn;
}
