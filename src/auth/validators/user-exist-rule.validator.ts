import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async validate(email: string) {
        
    const user = await this.usersRepository.findOneBy({ email });

    return user ? false : true
  }

  defaultMessage(args: ValidationArguments) {
    return `email already exist`;
  }
}
