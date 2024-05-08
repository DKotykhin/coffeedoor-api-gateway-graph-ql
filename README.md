# CoffeeDoor online shop

![Logo](https://coffeedoor-next14-sql.vercel.app/logo_700x191.webp)

## Description

API GraphQL Gateway backend for CoffeeDoor online shop

## Technologies

-   4 microservices: User, Menu, Order and Store + API Gateway
-   NestJS, gRPC, TypeORM, postgreSQL, Typescript, AWS S3, JWT, bcrypt, passport, sendGrid, Swagger, class-validator

## Features

-   GraphQL implementation
-   CRUD for menu categories and menu items based on roles
-   CRUD for store categories and store items based on roles
-   upload images for store items using AWS S3 service
-   role based authentication with JWT strategy and bcrypt for password hash
-   restore and update password with email token notification
-   email confirmation for registration
-   get store item with other items random recommendation
-   change position for menu and store items
-   upload and delete user avatar with AWS S3
-   upload and delete store images with AWS S3
-   user orders with telegram channel notification
-   input validation
-   Swagger documentation

## Environment Variables

To run this project locally, you will need to add the following environment variables to your .env file. See in .env.example in root directory

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Author

Dmytro Kotykhin
-   [Github](https://github.com/DKotykhin)
-   [Web](https://dmytro-kotykhin.pp.ua)
-   [LinkedIn](https://www.linkedin.com/in/dmytro-kotykhin-4683151b)
