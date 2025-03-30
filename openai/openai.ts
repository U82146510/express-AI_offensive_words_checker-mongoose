import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();
import {OpeniError} from '../error/error_handler';

const openai_key = process.env.openai;

if(!openai_key){
    console.error('missing openai sk');
    process.exit(1);
};

const openai = new OpenAI({apiKey:openai_key});

export async function check_language(input:string){
    try {
        const response = await openai.chat.completions.create({
            model:'chatgpt-4o-latest',
            messages:[
                {role:'system',content:`
                You will get a text, and you have to check the following:
                1.Profanity - general term for offensive words
                2.Obscenity - sexually explicit or vulgar content that's considered offensive
                3.Slurs - offensive terms targeting specific groups
                4.Hate speech - language promoting violence or discrimination
                5.Offensive language - broader term for anything considered inappropriate
                6.Censored words – the ones actively blocked or replaced (e.g., f***)
                7.Banned/blacklisted words – commonly used in moderation or filtering systems 

                if the input text has any of these "Respond with ONLY '1' or '0'. Do NOT include explanations."

                this is the text you have to check: ${input}
                `}
            ],
        });
        return response.choices[0].message.content
    } catch (error:unknown) {
        console.error(error);
        if(error instanceof Error){
            throw new OpeniError(400,error.message)
        }
        throw new OpeniError(500, 'Unknown error occurred in check_language');
    }
};

