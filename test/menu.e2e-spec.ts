import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('Menu Controller (e2e)', () => {
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

  it('get menu by language', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query GetMenuByLanguage {
          getMenuByLanguage(language: "UA") {
            id
            language
            title
            description
            image
            hidden
            position
            menuItems {
              id
              language
              title
              description
              price
              hidden
              position
            }
          }
        }`,
      })
      .expect(200);
    expect(res.body.data.getMenuByLanguage).toBeInstanceOf(Array);
  });
});
