import User from "@/app/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connect();

  try {
    const userId = await getTokenData(req);

    if (!userId) {
      return NextResponse.json({ error: "Invalid token data" }, { status: 400 });
    }

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User profile data fetched successfully",
      data: user
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({
      error: "Something went wrong while trying to get User Profile."
    }, { status: 500 });
  }
}
