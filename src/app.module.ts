import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from 'ormconfig';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';

/* istanbul ignore file */
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(config),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
