import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        // ✅ FIX 1: Check if User ALREADY exists by Email OR Username
        // We use $or to check both conditions at once
        const user = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (user) {
            // Check specifically which one failed to give a better message
            if (user.email === email) {
                return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
            }
            if (user.username === username) {
                return NextResponse.json({ error: "Username is already taken" }, { status: 400 });
            }
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        //send verification email
        await sendEmail({
            email, emailType: "VERIFY",
            userId: savedUser._id
        })

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}