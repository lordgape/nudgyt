import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import {
  getUserInstance,
  getUserObject,
} from '../../../test/data/mock.user.data';
import { UsersRepository } from './users.repository';

const mockUserRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
});
const mockJwtService = () => ({
  sign: jest.fn(),
});

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRepository],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  it('Can create a user with encypted password', async () => {
    jest.spyOn(usersRepository, 'create').mockImplementation(() => null);
    jest
      .spyOn(usersRepository, 'save')
      .mockImplementation(async () => getUserInstance());

    await usersRepository.createUser({
      firstname: 'John',
      lastname: 'Doe',
      email: 'doe@me.com',
      password: 'nicepassword',
    });

    expect(usersRepository.save).toHaveBeenCalled();
  });

  it('Can get a user base on property', async () => {
    jest
      .spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => getUserInstance());

    await usersRepository.findOneUser({
      email: 'doe@me.com',
    });

    expect(usersRepository.findOne).toHaveBeenCalled();
  });

  it('Can get all user', async () => {
    jest
      .spyOn(usersRepository, 'find')
      .mockImplementation(async () => [getUserInstance()]);

    await usersRepository.findAllUsers();

    expect(usersRepository.find).toHaveBeenCalled();
  });
});
