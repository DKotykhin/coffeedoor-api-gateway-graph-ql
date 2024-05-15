import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { PasswordDto, SignInDto } from '../src/auth/dto/auth.dto';

const signInDto: SignInDto = {
  email: 'kotykhin_d+1@ukr.net',
  password: 'Qq1234567',
};
const passwordDto: PasswordDto = {
  password: signInDto.password,
};

describe('User Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  let authToken: string;
  let userId: string;

  it('should login', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation SignIn($signInDto: SignInDto!) {
          signIn(signInDto: $signInDto) {
            token
            user {
              id
              email
              userName
              address
              phoneNumber
              avatar
              isVerified
              role
              createdAt
              updatedAt
            }
          }
        }`,
        variables: { signInDto },
      })
      .expect(200);
    expect(res.body.data.signIn).toHaveProperty('token');
    expect(res.body.data.signIn.user.id).toBeTruthy();
    expect(res.body.data.signIn.user.email).toBe(signInDto.email);
    expect(res.body.data.signIn.user.role).toContain('ADMIN' || 'SUBADMIN');
    authToken = res.body.data.signIn.token;
    userId = res.body.data.signIn.user.id;
  });

  it('should not login - invalid credentials', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation SignIn($signInDto: SignInDto!) {
          signIn(signInDto: $signInDto) {
            token
            user {
              id
            }
          }
        }`,
        variables: {
          signInDto: {
            email: signInDto.email,
            password: 'Qq12345678',
          },
        },
      })
      .expect(200);
    expect(res.body.errors[0].message).toBe('Password not match');
  });

  it('should not login - validation error', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation SignIn($signInDto: SignInDto!) {
          signIn(signInDto: $signInDto) {
            token
            user {
              id
            }
          }
        }`,
        variables: {
          signInDto: {
            email: 'kotykhin_d+1ukr.net',
            password: '12345',
          },
        },
      })
      .expect(200);
    expect(res.body.errors[0].message).toBe('Bad Request Exception');
  });

  it('should get user by token', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `query GetUserByToken {
          getUserByToken {
            id
            email
            userName
            address
            phoneNumber
            avatar
            isVerified
            role
            createdAt
            updatedAt
          }
        }`,
      })
      .expect(200);
    expect(res.body.data.getUserByToken).toHaveProperty('id');
    expect(res.body.data.getUserByToken.id).toBe(userId);
    expect(res.body.data.getUserByToken.email).toBe(signInDto.email);
  });

  it('should not get user by token - invalid token', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}1`)
      .send({
        query: `query GetUserByToken {
          getUserByToken {
            id
          }
        }`,
      })
      .expect(200);
    expect(res.body.errors[0].message).toBe('Unauthorized');
  });

  it('should get user by email', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `query GetUserByEmail($emailDto: EmailDto!) {
          getUserByEmail(emailDto: $emailDto) {
            id
            email
            userName
            address
            phoneNumber
            avatar
            isVerified
            role
            createdAt
            updatedAt
          }
        }`,
        variables: { emailDto: { email: signInDto.email } },
      })
      .expect(200);
    expect(res.body.data.getUserByEmail).toHaveProperty('id');
    expect(res.body.data.getUserByEmail.email).toBe(signInDto.email);
  });

  it('should not get user by email - email error', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `query GetUserByEmail($emailDto: EmailDto!) {
          getUserByEmail(emailDto: $emailDto) {
            id
            email
            userName
          }
        }`,
        variables: { emailDto: { email: 'kotykhin_d+111@ukr.net' } },
      })
      .expect(200);
    expect(res.body.errors[0].message).toBe('User not found');
  });

  it('should not get user by email - validation error', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `query GetUserByEmail($emailDto: EmailDto!) {
          getUserByEmail(emailDto: $emailDto) {
            id
            email
            userName
          }
        }`,
        variables: { emailDto: { email: 'kotykhin_d+1ukr.net' } },
      })
      .expect(200);
    expect(res.body.errors[0].message).toBe('Bad Request Exception');
  });

  it('should get user by id', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `query GetUserById($idDto: IdDto!) {
          getUserById(idDto: $idDto) {
            id
            email
            userName
            address
            phoneNumber
            avatar
            isVerified
            role
            createdAt
            updatedAt
          }
        }`,
        variables: { idDto: { id: userId } },
      })
      .expect(200);
    expect(res.body.data.getUserById).toHaveProperty('id');
    expect(res.body.data.getUserById.email).toBe(signInDto.email);
  });

  it('should confirm password', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `mutation ConfirmPassword($passwordDto: PasswordDto!) {
          confirmPassword(passwordDto: $passwordDto) {
            status
            message
          }
        }`,
        variables: { passwordDto },
      })
      .expect(200);
    expect(res.body.data.confirmPassword).toHaveProperty('status', true);
  });

  it('should not confirm password - password error', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `mutation ConfirmPassword($passwordDto: PasswordDto!) {
          confirmPassword(passwordDto: $passwordDto) {
            status
            message
          }
        }`,
        variables: {
          passwordDto: {
            password: 'Qq12345678',
          },
        },
      })
      .expect(200);
    expect(res.body.errors[0].message).toBe('Password not match');
  });

  it('should not confirm password - validation error', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `mutation ConfirmPassword($passwordDto: PasswordDto!) {
          confirmPassword(passwordDto: $passwordDto) {
            status
            message
          }
        }`,
        variables: {
          passwordDto: {
            password: '12345',
          },
        },
      })
      .expect(200);
    expect(res.body.errors[0].message).toBe('Bad Request Exception');
  });
});
