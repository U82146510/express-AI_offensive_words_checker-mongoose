import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connection_string = process.env.connect;

if(!connection_string){
    console.error('missing connection string');
    process.exit(1);
};

export const connect_db = async()=>{
    try {
        await mongoose.connect(connection_string);
    } catch (error) {
        console.error(error);
    }
};

const db:mongoose.Connection=mongoose.connection;

db.on('error',(err:Error)=>{
    console.error(err.message);
});

db.on('connection',()=>{
    console.log("connected");
});

db.on('disconnected',()=>{
    console.log('disconnected');
});

db.on('reconnected',()=>{
    console.log('reconnected');
});