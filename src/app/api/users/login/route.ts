import { connect } from "@/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    //To check all field are fill
    if (!(email || password)) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // To find the user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(`User not found while try to login `);
    }

    // To check the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(`Incorrect password while try to login `);
    }

    // To send token

    const tokenData  = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });

    // To send response
    const response = NextResponse.json({
      message: "User logged in successfully",
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;

    
  } catch (error: any) {
    return NextResponse.json(`Something went wrong while login User\n
        Error : ${error}`);
  }
}
