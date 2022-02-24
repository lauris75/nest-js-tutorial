import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class AuthService {
    constructor(private clientsService: ClientsService,
                private jwtService: JwtService){}

    async validateClient(username: string, password:string): Promise<any> {
        const client = await this.clientsService.findByUser(username);

        if( client.password == password){
            if(client.confirmed){
                throw new Error ('Please confirm your email to login');
            }
            const {username, password, _id, __v, ...rest} = client;
            return client;
        }
        
        return null;
    }

    async validateEmail(){}

    async login(client: any){
        const payload = { name: client.name, sub: client.id };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
