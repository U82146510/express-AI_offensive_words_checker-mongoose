import express,{ type Application } from "express";
import {connect_db} from './config/atlas';
import {post_com} from './routes/posts';
import {error_handler} from './error/error_handler';

const app:Application = express();
const port:number = 3000;

app.use(express.json());
app.use('/',post_com);
app.use(error_handler);

const start = async()=>{
    try {
        await connect_db();
        app.listen(port,()=>console.log("ON"));
    } catch (error) {
        console.error(error);
    }
};

start();