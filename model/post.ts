import mongoose,{Document,Schema,Model, model} from "mongoose";


export interface IPost extends Document{
    title:string;
    content:string;
    author:string;
};

const post_schema = new Schema<IPost>({
    title:{
        type:String,
        required:[true,'Title is required'],
        minlength:5,
        maxlength:200,
        trim:true,
        index:true,
    },
    content:{
        type:String,required:true,
    },
    author:{
        type:String,
        required:true,
        trim:true,
    },
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
});


post_schema.virtual('comments',{
    ref:'Comment',
    localField:'_id',
    foreignField:'post'
});


post_schema.index({
    title:'text',content:'text'
});

export const Post:Model<IPost> = model<IPost>('Post',post_schema);
