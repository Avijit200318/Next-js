import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("mongodb connected successfully");
        })

        connection.on('error', (error) => {
            console.log("mongodb connection error " + error);
            process.exit();
        })

    }catch(error){
        console.log(error);
    }
}