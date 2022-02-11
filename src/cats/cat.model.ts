import * as mongoose from 'mongoose';
import { IsString, IsInt} from 'class-validator';

export const CatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    breed: { type: String, required: true }
})

export class Cat extends mongoose.Document {
    id: string;

    @IsString()
    name: string;

    @IsInt()
    age: number;
    
    @IsString()
    breed: string;
}