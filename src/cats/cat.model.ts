import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    breed: { type: String, required: true }
})

export interface Cat extends mongoose.Document {
    id: string;
    name: string;
    age: number;
    breed: string;
}