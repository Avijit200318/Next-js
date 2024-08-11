import {connect} from "@/dbConfig/dbConfig";
// import {connect} from "@/dbConfig/dbConfig"; if I install it during package installation
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();
// create the connection for mongodb

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log(reqBody);

        // check if user already exist
        const user = await userModel.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser = new userModel({
            username,
            email,
            password: hashPassword
        })

        const savedUser = await newUser.save();

        // before sending response send email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});
        
        return NextResponse.json({message: "User created successfully", success: true, savedUser}, {status: 201});

    }catch(error: any){
        return NextResponse.json({error: error.message, success: false}, {status: 500});
    }
}
