import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from './create-client.dto';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
    constructor(private readonly ClientsService: ClientsService) {}

    @Post()
    async addClient(@Body() createClientDto: CreateClientDto) {
        createClientDto.confirmed = false;
        const generatedID = await this.ClientsService.addClient(createClientDto);
        return generatedID;
    }

    @Get()
    async getAllClients(){
        const clients = await this.ClientsService.getAllClients();
        return clients.map((client) => ({
            id: client.id,
            username: client.username,
            password: client.password,
            name: client.name,
            surname: client.surname,
            age: client.age,
            gender: client.gender,
            email: client.email,
            birthDate: client.birthDate,
            personalCode: client.personalCode
        }));
    }

    @Get(':id')
    getClientByID(@Param('id') clientID: string){
        return this.ClientsService.getClientByID(clientID);
    }

    @Patch(':id')
    async updateClient(
        @Param('id') clientID: string,
        @Body() updateClientDto: UpdateClientDto): Promise<string> {
        await this.ClientsService.updateClient(clientID, updateClientDto);
        return 'Information update about the client was successful.';
    }

    @Delete(':id')
    async deleteClient(@Param('id') clientID: string): Promise<string>{
        await this.ClientsService.deleteClient(clientID);
        return 'Client deletion successful.';
    }
}
