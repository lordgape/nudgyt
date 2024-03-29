import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';
import { UsersRepository } from './repositories/users.repository';
import { UserMutationResolver } from './resolvers/mutation/user.resolver';
import { UserQueryResolver } from './resolvers/query/user.resolver';
import { UserExistsRule } from './validators/user-exist-rule.validator';

/* istanbul ignore file */
@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserExistsRule,
    JwtStrategy,
    UserQueryResolver,
    UserMutationResolver,
  ],
  exports: [UserExistsRule, JwtStrategy, PassportModule],
})
export class AuthModule {}
