import { IsString, IsInt, IsEmail} from 'class-validator';
import { genderCheck, checkBirthDate, passwordCheck } from './customValidations';

export class CreateClientDto{
    @IsString({message: "Username must be a string!"})
    username: string;

    @passwordCheck({message: "Password has to be at least of 8 characters and have letters and numbers in it!"})
    @IsString({message: "Password must be a string!"})
    password: string;

    @IsString({message: "Name must be a string!"})
    name: string;

    @IsString({message: "Surname must be a string!"})
    surname: string;

    @IsInt({message: "Age must be a number!"})
    age: number;

    @genderCheck({message: "Gender must be 'male' or 'female'!"})
    gender: string;

    @IsString({message: "Email must be a string!"})
    @IsEmail({message: "Enter a valid email!"})
    email: string;
    
    @checkBirthDate({message: "Birthdate must be in this form 'DD/MM/YYYY'!"})
    birthDate: string;

    @IsInt({message: "Personal code must be a number!"})
    personalCode: number;
}

export class UpdateClientDto{
    @IsString({message: "Password must be a string!"})
    password: string;

    @IsString({message: "Name must be a string!"})
    name: string;

    @IsString({message: "Surname must be a string!"})
    surname: string;

    @IsInt({message: "Age must be a number!"})
    age: number;

    @IsString({message: "Email must be a string!"})
    @IsEmail({message: "Enter a valid email!"})
    email: string;
}