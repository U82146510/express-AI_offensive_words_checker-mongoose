import {add_post,add_comment,get_comment} from '../controllers/posts';
import {Router} from 'express';

export const post_com:Router = Router();

post_com.post('/add_post',add_post);
post_com.post('/add_comment',add_comment);
post_com.get('/get_comment',get_comment);