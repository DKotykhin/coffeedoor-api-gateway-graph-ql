import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('Store Controller (e2e)', () => {
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

  it('get store by language', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query GetStoreByLanguage {
          getStoreByLanguage(language: "UA") {
            id
            language
            title
            subtitle
            hidden
            storeItems {
              slug
              language
              title
              description
              details
              sortKey
              sortValue
              country
              tm
              price
              oldPrice
              discount
              weight
              hidden
              position
              imageUrl
            }
          }
        }`,
      })
      .expect(200);
    expect(res.body.data.getStoreByLanguage).toBeInstanceOf(Array);
  });
});
