import mongoose, { Schema } from "mongoose"
import { Tables } from "@/lib/models/type"

export type UserRole = Tables<"user_roles">

const UserRoleSchema = new Schema<UserRole>({
    user_id: { type: String, required: true, index: true },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true,
    },
})

export const UserRoleModel =
    mongoose.models.UserRole ||
    mongoose.model<UserRole>("UserRole", UserRoleSchema)
