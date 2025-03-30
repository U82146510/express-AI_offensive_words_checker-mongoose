import { type Request,type Response,type NextFunction } from "express";
import { stat } from "fs";

export class OpeniError extends Error{
    constructor(public status:number,message:string){
        super(message);
        this.name = 'OpenAPI error';
    }
};

export const error_handler = (err:Error,req:Request,res:Response,next:NextFunction)=>{
    console.error(err.stack);
    if(res.headersSent){
       return next(err);
    }

    const status = err instanceof OpeniError ? err.status : 500;
    const message = err instanceof OpeniError ? err.message : 'Internal server error';

    res.status(status).json({message});
};