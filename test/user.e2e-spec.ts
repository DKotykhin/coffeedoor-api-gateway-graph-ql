import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

const credentials = {
  email: 'kotykhin_d+1@ukr.net',
  password: 'Qq1234567',
};

describe('User Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
        query: `mutation SignIn {
          signIn(signInDto: { 
            password: ${JSON.stringify(credentials.password)}, 
            email: ${JSON.stringify(credentials.email)} 
          }) {
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
      })
      .expect(200);
    expect(res.body.data.signIn).toHaveProperty('token');
    expect(res.body.data.signIn.user.id).toBeTruthy();
    expect(res.body.data.signIn.user.email).toBe(credentials.email);
    expect(res.body.data.signIn.user.role).toContain('ADMIN' || 'SUBADMIN');
    authToken = res.body.data.signIn.token;
    userId = res.body.data.signIn.user.id;
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
    expect(res.body.data.getUserByToken.email).toBe(credentials.email);
  });

  it('should get user by email', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `query GetUserByEmail {
          getUserByEmail(email: { email: ${JSON.stringify(credentials.email)} }) {
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
    expect(res.body.data.getUserByEmail).toHaveProperty('id');
    expect(res.body.data.getUserByEmail.email).toBe(credentials.email);
  });

  it('should not get user by email - email error', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `query GetUserByEmail {
          getUserByEmail(email: { email: "kotykhin_d+111@ukr.net" }) {
            id
            email
            userName
          }
        }`,
      })
      .expect(200);
    expect(res.body.errors[0].message).toBe('User not found');
  });

  it('should get user by id', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `query GetUserById {
          getUserById(id: ${JSON.stringify(userId)}) {
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
    expect(res.body.data.getUserById).toHaveProperty('id');
    expect(res.body.data.getUserById.email).toBe(credentials.email);
  });

  it('should confirm password', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `mutation ConfirmPassword {
          confirmPassword(password: { password: ${JSON.stringify(credentials.password)} }) {
            status
            message
          }
        }`,
      })
      .expect(200);
    expect(res.body.data.confirmPassword).toHaveProperty('status', true);
  });

  it('should not confirm password - error', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `mutation ConfirmPassword {
          confirmPassword(password: { password: "Qq12345678" }) {
            status
            message
          }
        }`,
      })
      .expect(200);
    expect(res.body.errors[0].message).toBe('Password not match');
  });
});
