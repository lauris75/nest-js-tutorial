import { Injectable } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class AuthService {
    constructor(private clientsService: ClientsService){}

    async validateClient(username: string, password:string): Promise<any> {
        const client = await this.clientsService.findByUser(username);

        if( client.password == password){
            const {username, password, ...rest} = client;
            return client;
        }
        
        return null;
        }
}
