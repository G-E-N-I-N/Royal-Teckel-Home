import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI non défini");
}

class Database {
    private connection: typeof mongoose | null = null;

    async connect() {
        if (this.connection) return this.connection;

        try {
            const options: mongoose.ConnectOptions = {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 30000,
                socketTimeoutMS: 60000,
                bufferCommands: false,
            };

            this.connection = await mongoose.connect(MONGODB_URI!, options);

            mongoose.connection.on("error", (err) => {
                console.error("Erreur MongoDB:", err);
            });

            mongoose.connection.on("disconnected", () => {
                console.log("MongoDB déconnecté");
            });

            console.log("Connecté à MongoDB");

            return this.connection;
        } catch (error) {
            console.error("Erreur de connexion MongoDB:", error);
            throw error;
        }
    }

    async disconnect() {
        if (!this.connection) return;
        try {
            await mongoose.connection.close();
            this.connection = null;
            console.log("MongoDB déconnecté");
        } catch (error) {
            console.error("Erreur lors de la fermeture de MongoDB:", error);
        }
    }

    isConnected(): boolean {
        return mongoose.connection.readyState === 1;
    }
}

export async function connectDB() {
    const database = new Database();
    return await database.connect();
}