import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.TYPEORM_URL,
  synchronize: false,
  useUnifiedTopology: true,
  logging: true,
  entities: ['dist/src/**/entities/*.entity.js'],
};

export default config;
