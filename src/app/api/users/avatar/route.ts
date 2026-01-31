import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json();
        const { avatar } = reqBody;

        const user = await User.findByIdAndUpdate(userId, { avatar: avatar }, { new: true });

        return NextResponse.json({
            message: "Avatar updated successfully",
            success: true,
            data: user
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}