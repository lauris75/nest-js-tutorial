<<<<<<< Updated upstream
=======
import * as mongoose from 'mongoose';
import { IsString, IsInt, IsPositive, IsEmail, IsDate} from 'class-validator';

export const ClientSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: String, required: true },
    personalCode: { type: Number, required: true}
})

export class Client extends mongoose.Document {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsInt()
    @IsPositive()
    age: number;

    @IsString()
    gender: string;

    @IsEmail()
    email: string;

    @IsString()
    birthDate: string;

    @IsInt()
    @IsPositive()
    personalCode: number;
}
>>>>>>> Stashed changes
