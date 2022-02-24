import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    confirmed: { type: Boolean, required: true},
    emailConfirmationToken: {type: String},
    birthDate: { type: String, required: true },
    personalCode: { type: Number, required: true}
})

export interface Client extends mongoose.Document {
    username: string;
    password: string;
    name: string;
    surname: string;
    age: number;
    gender: string;
    email: string;
    confirmed: boolean;
    emailConfirmationToken: string;
    birthDate: string;
    personalCode: number;
}