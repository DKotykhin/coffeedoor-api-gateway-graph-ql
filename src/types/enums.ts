import { registerEnumType } from '@nestjs/graphql';

export enum LanguageCode {
  UA = 'UA',
  EN = 'EN',
}
registerEnumType(LanguageCode, {
  name: 'LanguageCode',
});

export enum RoleTypes {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUBADMIN = 'SUBADMIN',
  VISITOR = 'VISITOR',
}

export enum OrderStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
}

export enum DeliveryWay {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP',
}
