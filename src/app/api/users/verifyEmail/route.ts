import {connect} from "@/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req:NextRequest){
  try {
    const reqBody = await req.json()
    const {token} = reqBody
    console.log(`Toekn:${token}`)

       // To match the token 
        const user = await  User.findOne({
            verifyToken : token,
            verifyTokenExpiry : {$gt: Date.now()}
        })  

        // To check the user 
        if(!user){
            return NextResponse.json({error:"Invalid Token"}, {status:400})
        }
       
        // Update isVerified filed and clead model
        user.isVerfied = true 
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        // 
        return NextResponse.json({
            message:"Email verified successfully",
            success:true},{status:200},)


  } catch (error:any) {
    return NextResponse.json(`Something went wrong while Verify User email\n
        Error : ${error}`)
  }
}