import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from './create-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './client.model';

@Injectable()
export class ClientsService {

    constructor(@InjectModel('Client') private readonly clientModel: Model<Client>) {}

    async addClient(createClientDto: CreateClientDto    ) {
        const newClient = new this.clientModel(createClientDto);
        const result = await newClient.save();
        return result.id;
    }

    async getAllClients() {
        const clients = await this.clientModel.find().exec();
        return clients as Client[];
    }

    async getClientByID(clientID: string) {
        const client = await this.findClient(clientID);
        return { 
            id: client.id,
            username: client.username,
            password: client.password,
            surname: client.surname,
            age: client.age,
            gender: client.gender,
            email: client.email,
            birthDate: client.birthDate,
            personalCode: client.personalCode
        };
    }

    async updateClient(
        clientID: string,
        username: string,
        password: string,
        name: string,
        surname: string,
        age: number,
        gender: string,
        email: string,
        birthDate: string,
        personalCode: number) {
        const updatedClient = await this.findClient(clientID);
        if(username){
            updatedClient.username = username;
        }
        if(password){
            updatedClient.password = password;
        }
        if(name){
            updatedClient.name = name;
        }
        if(surname){
            updatedClient.surname = surname;
        }
        if(age){
            updatedClient.age = age;
        }
        if(gender){
            updatedClient.gender = gender;
        }
        if(email){
            updatedClient.email = email;
        }
        if(birthDate){
            updatedClient.birthDate = birthDate;
        }
        if(personalCode){
            updatedClient.personalCode = personalCode;
        }
        updatedClient.save();
    }

    async deleteClient(clientID: string) {
        try{
            const result = await this.clientModel.deleteOne({_id: clientID}).exec();
        } catch (error){
            throw new NotFoundException("Client with such ID wasn't found.");
        }
    }

    private async findClient(clientID: string): Promise<Client> {
        let client: Client;
        try{
            client = await this.clientModel.findById(clientID);
        } catch (error) {
            throw new NotFoundException("Client with such ID wasn't found.");
        }
        if (!client){
            throw new NotFoundException("Cat with such ID wasn't found.");
        }
        return client;
    }

    async findByUser(clientUsername: string): Promise<Client> {
        let client: Client;
        try{
            client = await this.clientModel.findOne({username: clientUsername});
        } catch(error){
            throw new NotFoundException("Client with such username wasn't found.");
        } if (!client){
            throw new NotFoundException("Cat with such ID wasn't found.");
        }
        return client;
    }
}
