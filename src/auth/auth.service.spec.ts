import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/client/prisma.service';
import { AuthService } from './auth.service';
import {
  ConflictException,
  NotFoundException,
  // UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  // let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    // jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('login', () => {
    it('should throw NotFoundException if user is not found', async () => {
      prisma.user.findUnique = jest.fn().mockReturnValue(null);

      await expect(
        service.login('test@example.com', 'password'),
      ).rejects.toThrow(NotFoundException);
    });

    //   it('should throw UnauthorizedException if password is incorrect', async () => {
    //     const user = {
    //       id: 1,
    //       email: 'test@example.com',
    //       password: 'hashedPassword',
    //     };
    //     prisma.user.findUnique = jest.fn().mockReturnValue(user);
    //     jest.spyOn(bcrypt, 'compare').mockResolvedValue(Promise.resolve(false));

    //     await expect(
    //       service.login('test@example.com', 'password'),
    //     ).rejects.toThrow(UnauthorizedException);
    //   });

    //   it('should return JWT token if email and password are correct', async () => {
    //     const user = {
    //       id: 1,
    //       email: 'test@example.com',
    //       password: 'hashedPassword',
    //     };
    //     prisma.user.findUnique = jest.fn().mockReturnValue(user);
    //     jest.spyOn(bcrypt, 'compare').mockResolvedValue(Promise.resolve(true));
    //     jwtService.sign = jest.fn().mockReturnValue('jwtToken');

    //     const result = await service.login('test@example.com', 'password');
    //     expect(result).toEqual({ accessToken: 'jwtToken' });
    //   });
  });

  describe('register', () => {
    it('should throw ConflictException if email is already in use', async () => {
      prisma.user.findUnique = jest
        .fn()
        .mockReturnValue({ email: 'test@example.com' });

      const registerDto: RegisterDto = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password',
      };

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });

    // it('should create a new user successfully', async () => {
    //   prisma.user.findUnique = jest.fn().mockReturnValue(null);
    //   prisma.user.create = jest
    //     .fn()
    //     .mockReturnValue({ id: 1, email: 'test@example.com' });

    //   const registerDto: RegisterDto = {
    //     email: 'test@example.com',
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     password: 'password',
    //   };
    //   jest
    //     .spyOn(bcrypt, 'hash')
    //     .mockResolvedValue(Promise.resolve('hashedPassword'));

    //   const result = await service.register(registerDto);
    //   expect(result).toBe('User successfully registered');
    // });

    // it('should throw an error if something goes wrong during user creation', async () => {
    //   prisma.user.findUnique = jest.fn().mockReturnValue(null);
    //   prisma.user.create = jest
    //     .fn()
    //     .mockRejectedValue(new Error('Database error'));

    //   const registerDto: RegisterDto = {
    //     email: 'test@example.com',
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     password: 'password',
    //   };
    //   jest
    //     .spyOn(bcrypt, 'hash')
    //     .mockResolvedValue(Promise.resolve('hashedPassword'));

    //   await expect(service.register(registerDto)).rejects.toThrow(
    //     'Something went wrong when creating the user.  Error: Database error',
    //   );
    // });
  });
});
