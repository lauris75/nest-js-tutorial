import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { ClientsController } from './clients/clients.controller';
import { ClientsService } from './clients/clients.service';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [CatsModule,
            MongooseModule.forRoot('mongodb+srv://lauris:nesakysiu@cluster0.pq913.mongodb.net/nodejsTutorial?retryWrites=true&w=majority'),
            ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
