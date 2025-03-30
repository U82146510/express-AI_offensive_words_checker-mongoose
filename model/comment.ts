import mongoose,{Document,Types,Schema,Model, model} from "mongoose";

export interface IComment extends Document{
    post:Types.ObjectId;
    author:string;
    message:string;
};

const comment_schema = new Schema<IComment>({
    post:{
        type:Schema.Types.ObjectId,ref:'Post',required:true,index:true
    },
    author:{
        type:String,
        required:true,
        trim:true
    },
    message:{
        type:String,
        required:true,
        minlength:1,
        maxlength:1000
    }
},{
    timestamps:true
});

comment_schema.pre('save',function(next){
    console.log(`New comment by ${this.author}`);
    next();
});


export const comment:Model<IComment> = model<IComment>('Comment',comment_schema); 
