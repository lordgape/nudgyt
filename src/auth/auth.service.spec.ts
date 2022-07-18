import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getUserObject } from '../../test/data/mock.user.data';
import { AuthService } from './auth.service';
import { UsersRepository } from './repositories/users.repository';

const mockUserRepository = () => ({
  createUser: jest.fn(),
  findOneUser: jest.fn(),
  findAllUsers: jest.fn(),
});
const mockJwtService = () => ({
  sign: jest.fn(),
});

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository;
  let jwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useFactory: mockUserRepository,
        },
        {
          provide: JwtService,
          useFactory: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Can register user', () => {
    service.register({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@me.com',
      password: 'NicePassword',
    });

    expect(usersRepository.createUser).toHaveBeenCalled();
  });

  it('Can login with valid credentials', async () => {
    usersRepository.findOneUser.mockResolvedValue(getUserObject());
    jwtService.sign.mockResolvedValue('header.payload.signature');

    expect(
      await service.login({ username: 'john@me.com', password: 'MySecret@1' }),
    ).toEqual({ accessToken: 'header.payload.signature' });
  });

  it('Can deny login access for invalid credentials', async () => {
    usersRepository.findOneUser.mockResolvedValue(getUserObject());
    jwtService.sign.mockResolvedValue('header.payload.signature');

    expect(
      service.login({ username: 'john@me.com', password: 'MySecret' }),
    ).rejects.toThrow(
      new UnauthorizedException(`Please provide a valid credentials`),
    );
  });

  it('Can get all users', async () => {
    usersRepository.findAllUsers.mockResolvedValue([getUserObject()]);
    expect(await service.getUsers()).toEqual([getUserObject()]);
  });
});
