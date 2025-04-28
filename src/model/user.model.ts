import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    username: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
});

export const User = model('User', UserSchema);