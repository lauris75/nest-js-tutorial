import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateCatDto} from './create-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private readonly CatsService: CatsService) {}

    @Post()
    async addCat(@Body() createCatDto: CreateCatDto) {
        const generatedID = await this.CatsService.addCat(createCatDto);
        return generatedID;
    }

    @Get()
    async getAllCats(){
        const cats = await this.CatsService.getAllCats();
        return cats.map((cat) => ({id: cat.id, name: cat.name, age: cat.age, breed: cat.breed}));
    }

    @Get(':id')
    getCatByID(@Param('id') catID: string){
        return this.CatsService.getCatByID(catID);
    }

    @Patch(':id')
    async updateCat(
        @Param('id') catID: string,
        @Body('name') newName: string,
        @Body('age') newAge: number,
        @Body('breed') newBreed: string): Promise<string> {
        
        await this.CatsService.updateCat(catID, newName, newAge, newBreed);
        return 'Information update about the cat was successful.';
    }

    @Delete(':id')
    async deleteCat(@Param('id') catID: string): Promise<string>{
        await this.CatsService.deleteCat(catID);
        return 'Cat deletion successful.';
    }
}
