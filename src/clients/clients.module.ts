import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientSchema } from './client.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Cat', schema: ClientSchema}])],
    controllers: [ClientsController],
    providers: [ClientsService]
})
export class ClientsModule {}
