import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientSchema } from './client.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Client', schema: ClientSchema}])],
    controllers: [ClientsController],
    providers: [ClientsService],
    exports: [ClientsService]
})
export class ClientsModule {}
