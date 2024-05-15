import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { LanguageCode } from '../src/common/types/enums';
import { CreateMenuCategoryDto } from '../src/menu-category/dto/_index';
import { SignInDto } from '../src/auth/dto/auth.dto';

const credentials: SignInDto = {
  email: 'kotykhin_d+1@ukr.net',
  password: 'Qq1234567',
};

const mockCreateMenuCategoryDto: CreateMenuCategoryDto = {
  language: LanguageCode.UA,
  title: 'Test title',
  description: 'Test description',
  image: 'Test image',
  hidden: false,
  position: 0,
};

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

  let authToken: string;
  let menuCategoryId: string;

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

  it('get all menu categories', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `query GetMenuCategories {
          getMenuCategories {
            id
            language
            title
            description
            image
            hidden
            position
          }
        }`,
      })
      .expect(200);
    expect(res.body.data.getMenuCategories).toBeInstanceOf(Array);
  });

  it('should create menu category', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `mutation CreateMenuCategory($createMenuCategoryDto: CreateMenuCategoryDto!) {
          createMenuCategory(createMenuCategoryDto: $createMenuCategoryDto) {
            id
            language
            title
            description
            image
            hidden
            position
          }
        }`,
        variables: { createMenuCategoryDto: mockCreateMenuCategoryDto },
      })
      .expect(200);
    expect(res.body.data.createMenuCategory).toHaveProperty('id');
    expect(res.body.data.createMenuCategory).toHaveProperty(
      'title',
      mockCreateMenuCategoryDto.title,
    );
    expect(res.body.data.createMenuCategory).toHaveProperty(
      'description',
      mockCreateMenuCategoryDto.description,
    );
    menuCategoryId = res.body.data.createMenuCategory.id;
  });

  it('should get menu category by id', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `query GetMenuCategoryById {
          getMenuCategoryById(id: ${JSON.stringify(menuCategoryId)}) {
            id
            language
            title
            description
            image
            hidden
            position
          }
        }`,
      })
      .expect(200);
    expect(res.body.data.getMenuCategoryById).toHaveProperty('id');
    expect(res.body.data.getMenuCategoryById.id).toBe(menuCategoryId);
  });

  it('should update menu category', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `mutation UpdateMenuCategory {
          updateMenuCategory(updateMenuCategoryDto: {
            id: ${JSON.stringify(menuCategoryId)},
            title: "Updated test title",
          }) {
            id
            language
            title
            description
            image
            hidden
            position
          }
        }`,
      })
      .expect(200);
    expect(res.body.data.updateMenuCategory).toHaveProperty(
      'id',
      menuCategoryId,
    );
    expect(res.body.data.updateMenuCategory).toHaveProperty(
      'title',
      'Updated test title',
    );
  });

  it('should delete menu category', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `mutation DeleteMenuCategory {
          deleteMenuCategory(id: ${JSON.stringify(menuCategoryId)}) {
            status
          }
        }`,
      })
      .expect(200);
    expect(res.body.data.deleteMenuCategory).toHaveProperty('status', true);
  });

  it('should not get menu category by id', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        query: `query GetMenuCategoryById {
          getMenuCategoryById(id: ${JSON.stringify(menuCategoryId)}) {
            id
            language
            title
            description
            image
            hidden
            position
          }
        }`,
      })
      .expect(200);
    expect(res.body.errors[0].message).toBe('Menu category not found');
  });
});
