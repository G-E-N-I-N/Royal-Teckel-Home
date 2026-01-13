import mongoose, { Schema } from "mongoose"
import { Tables } from "@/lib/models/type"

export type Profile = Tables<"profiles">

const ProfileSchema = new Schema<Profile>(
    {
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        full_name: { type: String },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
)

export const ProfileModel =
    mongoose.models.Profile || mongoose.model<Profile>("Profile", ProfileSchema)
