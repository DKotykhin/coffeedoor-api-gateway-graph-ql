import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { CreateStoreCategoryDto } from '../src/store-category/dto/create-store-category.dto';
import { LanguageCode } from '../src/common/types/enums';
import { SignInDto } from '../src/auth/dto/auth.dto';

const credentials: SignInDto = {
  email: 'kotykhin_d+1@ukr.net',
  password: 'Qq1234567',
};

const mockCreateStoreCategoryDto: CreateStoreCategoryDto = {
  language: LanguageCode.UA,
  title: 'New title',
  subtitle: 'New subtitle',
  hidden: false,
  position: 111,
};

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
        query: `query GetStoreByLanguage($languageDto: LanguageDto!) {
          getStoreByLanguage(languageDto: $languageDto) {
            id
            language
            title
            subtitle
            hidden
            position
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
        variables: { languageDto: { language: LanguageCode.UA } },
      })
      .expect(200);
    expect(res.body.data.getStoreByLanguage).toBeInstanceOf(Array);
  });

  let authToken: string;
  let storeCategoryId: string;

  it('should login', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation SignIn($signInDto: SignInDto!) {
          signIn(signInDto: $signInDto) {
            token
          }
        }`,
        variables: { signInDto: credentials },
      })
      .expect(200);
    expect(res.body.data.signIn).toHaveProperty('token');
    expect(res.body.data.signIn.token).toBeTruthy();
    authToken = res.body.data.signIn.token;
  });

  it('get all store categories', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query GetAllStore {
          getAllStore {
            id
            language
            title
            subtitle
            hidden
            position
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
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    expect(res.body.data.getAllStore).toBeInstanceOf(Array);
  });

  it('create store category', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `mutation CreateStoreCategory($createStoreCategoryDto: CreateStoreCategoryDto!) {
          createStoreCategory(createStoreCategoryDto: $createStoreCategoryDto) {
            id
            language
            title
            subtitle
            hidden
            position
          }
        }`,
        variables: {
          createStoreCategoryDto: mockCreateStoreCategoryDto,
        },
      })
      .expect(200);
    expect(res.body.data.createStoreCategory).toHaveProperty('id');
    expect(res.body.data.createStoreCategory.language).toBe(
      mockCreateStoreCategoryDto.language,
    );
    expect(res.body.data.createStoreCategory.title).toBe(
      mockCreateStoreCategoryDto.title,
    );
    expect(res.body.data.createStoreCategory.subtitle).toBe(
      mockCreateStoreCategoryDto.subtitle,
    );
    storeCategoryId = res.body.data.createStoreCategory.id;
  });

  it('get store category by id', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `query GetStoreCategoryById($idDto: IdDto!) {
          getStoreCategoryById(idDto: $idDto) {
            id
            language
            title
            subtitle
            hidden
            position
          }
        }`,
        variables: { idDto: { id: storeCategoryId } },
      })
      .expect(200);
    expect(res.body.data.getStoreCategoryById).toHaveProperty(
      'id',
      storeCategoryId,
    );
  });

  it('update store category', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `mutation UpdateStoreCategory($updateStoreCategoryDto: UpdateStoreCategoryDto!) {
          updateStoreCategory(updateStoreCategoryDto: $updateStoreCategoryDto) {
            id
            language
            title
            subtitle
            hidden
            position
          }
        }`,
        variables: {
          updateStoreCategoryDto: {
            id: storeCategoryId,
            title: 'Updated title',
          },
        },
      })
      .expect(200);
    expect(res.body.data.updateStoreCategory).toHaveProperty(
      'id',
      storeCategoryId,
    );
    expect(res.body.data.updateStoreCategory.title).toBe('Updated title');
  });

  it('delete store category', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `mutation DeleteStoreCategory($idDto: IdDto!) {
          deleteStoreCategory(idDto: $idDto) {
            status
          }
        }`,
        variables: { idDto: { id: storeCategoryId } },
      })
      .expect(200);
    expect(res.body.data.deleteStoreCategory).toHaveProperty('status', true);
  });

  it('should not get store category by id - not found', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `query GetStoreCategoryById($idDto: IdDto!) {
          getStoreCategoryById(idDto: $idDto) {
            id
            language
            title
            subtitle
            hidden
            position
          }
        }`,
        variables: { idDto: { id: storeCategoryId } },
      })
      .expect(200);
    expect(res.body.errors[0].message).toBe('Store category not found');
  });
});
