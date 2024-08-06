import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try{
        const token = request.cookies.get("next_token")?.value || '';
        const decodeToken:any = jwt.verify(token, process.env.JWT_SECRECT!);
        return decodeToken;
    }catch(error: any){
        throw new Error(error.message);
    }
}