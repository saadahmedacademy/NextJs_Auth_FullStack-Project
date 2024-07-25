import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function getTokenData(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 400 });
    }

    const decodedToken :any= jwt.verify(token, process.env.TOKEN_SECRET!);

    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    return decodedToken.id;
  } catch (error : any) {
    return NextResponse.json({
      error: `Something went wrong while trying to get the token. Error: ${error.message}`
    }, { status: 500 });
  }
}
