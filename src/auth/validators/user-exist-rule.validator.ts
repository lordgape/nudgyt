import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UsersRepository } from '../repositories/users.repository';

/* istanbul ignore file */
@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async validate(email: string) {
    const user = await this.usersRepository.findOne({ email });

    return user ? false : true;
  }

  defaultMessage(args: ValidationArguments) {
    return `email ${args.value} already exist`;
  }
}
