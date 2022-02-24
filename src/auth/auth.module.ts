import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from 'src/clients/clients.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [ClientsModule, PassportModule, JwtModule.register({
    secret: 'SECRET',
    signOptions: { expiresIn: '60s'}
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy,
  { provide: APP_GUARD,
    useClass: JwtAuthGuard }
    ],
  exports: [AuthService]
})
export class AuthModule {}
