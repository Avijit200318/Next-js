import {connect} from "../../../dbConfig/dbConfig";
import userModel from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
// this line help us to connect to mongodb. Every time in nextjs we need to connect it

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);
        const user = await userModel.findOne({email});
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400});
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRECT!, {expiresIn: "1h"});

        const res = NextResponse.json({meassage: "user login successfully", success: true}, {status: 200});

        res.cookies.set("next_token", token, {httpOnly: true, maxAge: 60 * 60});
        return res;

    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}