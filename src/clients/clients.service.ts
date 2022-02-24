import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from './create-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './client.model';
import nodemailer from 'nodemailer';
import { sha256 } from 'js-sha256';

@Injectable()
export class ClientsService {

    constructor(@InjectModel('Client') private readonly clientModel: Model<Client>) {}

    async addClient(createClientDto: CreateClientDto    ) {
        createClientDto.emailConfirmationToken = await this.sendConfirmationEmail(createClientDto.email, createClientDto.username );
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
        const {_id, __v, ...rest} = client;

        return client;
    }

    async updateClient(clientID: string, updatedClientDto: UpdateClientDto) {
        const updatedClient = await this.findClient(clientID);
        if(updatedClientDto.username){
            throw new Error ("Client's username can't be changed.");
        }
        if(updatedClientDto.password){
            updatedClient.password = updatedClientDto.password;
        }
        if(updatedClientDto.name){
            updatedClient.name = updatedClientDto.name;
        }
        if(updatedClientDto.surname){
            updatedClient.surname = updatedClientDto.surname;
        }
        if(updatedClientDto.age){
            updatedClient.age = updatedClientDto.age;
        }
        if(updatedClientDto.gender){
            updatedClient.gender = updatedClientDto.gender;
        }
        if(updatedClientDto.email){
            updatedClient.email = updatedClientDto.email;
        }
        if(updatedClientDto.birthDate){
            throw new Error ("Client's birth date can't be changed.");
        }
        if(updatedClientDto.personalCode){
            throw new Error ("Client's personal code can't be changed.");
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

    async sendConfirmationEmail(email: string, username: string): Promise<string>{
        const token = sha256(username);
        var transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: 'laurisapps9', pass: 'nesakysiu' } });
        var mailOptions = { from: 'no-reply@example.com', to: email, subject: 'Account Verification Link', text: 'Hello '+ username +',\n\n' + 'Please verify your account by clicking the link: \nhttp:http://localhost:3000/confirmation/' + token };
        transporter.sendMail(mailOptions);
        return token;
    }

    async ValidateEmail(token: string){
        let client: Client;
        try{
            client = await this.clientModel.findOne({emailConfirmationToken: token});
        } catch(error){
            throw new NotFoundException("Email was already confirmed or your verification link expired.");
        }
        client.confirmed = true;
        client.save();
        return 'Your email was confirmed, please login.'
    }
}
