import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [CatsModule,
            ClientsModule,
            MongooseModule.forRoot('mongodb+srv://lauris:nesakysiu@cluster0.pq913.mongodb.net/nodejsTutorial?retryWrites=true&w=majority')
            ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
