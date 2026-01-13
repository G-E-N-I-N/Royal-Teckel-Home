import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { DogModel } from "@/lib/models/dog.model";
import type { Dog } from "@/lib/models/dog.model";

export async function GET(
    _: Request,
    context: { params: { id: string } }
) {
    await connectDB();

    const { id } = await context.params;
    const dog = await DogModel.findById(id);

    if (!dog) {
        return NextResponse.json(
            { message: "Dog not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(dog);
}

export async function PUT(
    req: Request,
    context: { params: { id: string } }
) {
    await connectDB();

    const { id } = await context.params;
    const body: Partial<Dog> = await req.json();

    const dog = await DogModel.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true }
    );

    if (!dog) {
        return NextResponse.json(
            { message: "Dog not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(dog);
}

export async function DELETE(
    _: Request,
    context: { params: { id: string } }
) {
    await connectDB();

    const { id } = await context.params;
    const dog = await DogModel.findByIdAndDelete(id);

    if (!dog) {
        return NextResponse.json(
            { message: "Dog not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true });
}
