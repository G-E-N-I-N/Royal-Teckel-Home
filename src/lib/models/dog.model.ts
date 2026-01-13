import mongoose, { Schema, Model } from "mongoose"
import { Tables } from "@/lib/models/type"

export type Dog = Tables<"dogs">

const DogSchema = new Schema<Dog>(
    {
        name: { type: String, required: true },
        breed: { type: String, required: true },
        age_months: { type: Number, required: true },
        price: { type: Number, required: true },

        gender: {
            type: String,
            enum: ["male", "female"],
            required: true,
        },

        size: {
            type: String,
            enum: ["small", "medium", "large"],
            required: true,
        },

        status: {
            type: String,
            enum: ["available", "reserved", "sold"],
            default: "available",
        },

        description_fr: String,
        description_en: String,
        image_url: String,
        is_featured: { type: Boolean, default: false },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
)

export const DogModel: Model<Dog> =
    mongoose.models.Dog || mongoose.model<Dog>("Dog", DogSchema)
