import { IsString, IsInt} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCatDto{
    @IsString({message: "Cat name must be a string!"})
    name: string;

    @IsInt({message: "Cat age must be a number!"})
    age: number;
    
    @IsString({message: "Cat breed must be a string!"})
    breed: string;
}

export class UpdateCatDto extends PartialType(CreateCatDto) {}