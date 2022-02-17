import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto} from './create-cat.dto';
import { Cat } from './cat.model';

@Injectable()
export class CatsService {

    constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}
    
    async addCat(createCatDto: CreateCatDto) {
        const newCat = new this.catModel(createCatDto);
        const result = await newCat.save();
        return result.id;
    }

    async getAllCats() {
        const cats = await this.catModel.find().exec();
        return cats as Cat[];
    }

    async getCatByID(catID: string) {
        const cat = await this.findCat(catID);
        return { id: cat.id, name: cat.name, age: cat.age, breed: cat.breed};
    }

    async updateCat(catID: string, newName:string, newAge: number, newBreed: string) {
        const updatedCat = await this.findCat(catID);
        if(newName){
            updatedCat.name = newName;
        }
        if(newAge){
            updatedCat.age = newAge;
        }
        if(newBreed){
            updatedCat.breed = newBreed;
        }
        updatedCat.save();
    }

    async deleteCat(catID: string): Promise<boolean> {
        try{
            const result = await this.catModel.deleteOne({_id: catID}).exec();
            return true;
        } catch (error){
            throw new NotFoundException("Cat with such ID wasn't found.");
        }
        return false;
    }

    private async findCat(catID: string): Promise<Cat> {
        let cat;
        try{
            cat = await this.catModel.findById(catID);
        } catch (error) {
            throw new NotFoundException("Cat with such ID wasn't found.");
        }
        if (!cat){
            throw new NotFoundException("Cat with such ID wasn't found.");
        }
        return cat;
    }
}
