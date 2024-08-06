import { getDataFromToken } from "@/helpers/getDataFromToken";
// this route we want to grab some information using token

import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig"

connect();

export async function GET(request: NextRequest){
    try{
        const userInfo = await getDataFromToken(request);
        const user = await userModel.findById(userInfo.id).select("-password");
        return NextResponse.json({message: "user found", user, success: true}, {status: 200});
    }catch(error: any){
        return NextResponse.json({error: error.message, success: false}, {status: 500});
    }
}
