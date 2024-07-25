import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        message: "User logged out successfully",
        success: true,
      },
      { status: 200 }
    );

    response.cookies.delete("token")
    return response;
  } catch (error: any) {
    return NextResponse.json(`Something went wrong while logOut User\n
        Error : ${error}`);
  }
}
