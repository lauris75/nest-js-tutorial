import { Module } from '@nestjs/common';
import { ClientsModule } from 'src/clients/clients.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [ClientsModule, PassportModule],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
