import { type Request,type Response,type NextFunction } from "express";
import {Post,type IPost} from '../model/post';
import {comment,type IComment} from '../model/comment';
import Joi from "joi";
import {check_language} from '../openai/openai';

const post_validate = Joi.object({
    title:Joi.string().required().min(5).max(200).trim(),
    content:Joi.string().required(),
    author:Joi.string().required()
});

function isPost(arg:any):asserts arg is IPost{
    if(!arg || !("title" in arg) || arg===null
 || !("content" in arg) || !("author" in arg)
){
        throw new Error('input data is invalid');
    }
};


export const add_post = async(req:Request,res:Response,next:NextFunction)=>{
    const {value,error} = post_validate.validate(req.body);
    if(error){
        res.status(400).json({error:error.message});
        return;
    }
    isPost(value);
    try {
        const vocabulary = await check_language(value.title);
        if(vocabulary==="1"){
            res.status(400).json({message:'Do not use offensive vocabulary'});
            return;
        }
        const if_exists = await Post.findOne({title:value.title});
        if(if_exists){
            res.status(409).json({error:'post with this title already exists'});
            return;
        }
        const post = await Post.create({
            title:value.title,content:value.content,author:value.author
        });
        res.status(201).json({message:'added post successfully',id:post._id});
    } catch (error) {
        next(error)
    }
};

const comment_validate = Joi.object({
    post:Joi.string().required(),
    author:Joi.string().required(),
    message:Joi.string().required()
});

function isComment(arg:any):asserts arg is IComment{
    if(!arg || !("post" in arg) || arg===null
 || !("author" in arg) || !("message" in arg)
){
        throw new Error('input data is invalid');
    }
};



export const add_comment = async(req:Request,res:Response,next:NextFunction)=>{
    const {value,error} = comment_validate.validate(req.body);
    if(error){
        res.status(400).json({error:error.message});
        return;
    }
    isComment(value);
    try {
        const vocabulary = await check_language(value.message);
        if(vocabulary==="1"){
            res.status(400).json({message:'Do not use offensive vocabulary'});
            return;
        }
        const comments = await comment.create({
            post:value.post,author:value.author,message:value.message
        });
        res.status(200).json({message:'comment added successfully'});
    } catch (error) {
        next(error)
    }
};


export const get_comment = async(req:Request,res:Response,next:NextFunction)=>{
    const {title,page=1,limit=10} = req.body;
    if(!title){
        res.status(400).json({message:'title is missing'});
        return;
    }
    const skip = (page-1)*limit;

    try {
        const post = await Post.findOne({title}).populate({path:'comments',options:{
            sort:{createdAt:-1},skip,limit,
        }});
        res.status(200).json({message:post});    
    } catch (error) {
        next(error)
    }
};