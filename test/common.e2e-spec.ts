import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('Common Controller (e2e)', () => {
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

  it('/ (GET)', async () => {
    await request(app.getHttpServer()).get('/').expect(404);
  });

  it('health check', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query HealthCheck {
          healthCheck {
            menuService {
              status
            }
            storeService {
              status
            }
            userService {
              status
            }
            orderService {
              status
            }
          }
      }`,
      })
      .expect(200);
    expect(res.body.data.healthCheck).toHaveProperty('menuService');
    expect(res.body.data.healthCheck).toHaveProperty('storeService');
    expect(res.body.data.healthCheck).toHaveProperty('userService');
    expect(res.body.data.healthCheck).toHaveProperty('orderService');
  });
});
