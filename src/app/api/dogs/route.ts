import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { DogModel } from "@/lib/models/dog.model";
import type { Dog } from "@/lib/models/dog.model";

export async function GET(req: Request) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const breed = searchParams.get("breed");

    const filter: Partial<Dog> = {};
    if (breed && breed !== "all") {
        filter.breed = breed;
    }

    const dogs = await DogModel.find(filter).sort({ created_at: -1 });

    return NextResponse.json(dogs);
}

export async function POST(req: Request) {
    await connectDB();

    const body: Omit<Dog, "id" | "created_at" | "updated_at"> = await req.json();

    const dog = await DogModel.create(body);

    return NextResponse.json(dog, { status: 201 });
}
