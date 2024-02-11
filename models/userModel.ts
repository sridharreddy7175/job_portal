import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../interfaces/userInterfaces';

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

//EXPORT
export default mongoose.model<IUserModel>('User', UserSchema);
