import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { HealthCheckResponse_ServingStatus } from '../health-check.pb';

@ObjectType()
export class HealthCheckStatus {
  @Field(() => HealthCheckResponse_ServingStatus, { nullable: true })
  status: HealthCheckResponse_ServingStatus;
}

registerEnumType(HealthCheckResponse_ServingStatus, {
  name: 'HealthCheckResponse_ServingStatus',
});

@ObjectType()
export class HealthCheck {
  @Field()
  menuService: HealthCheckStatus;

  @Field()
  storeService: HealthCheckStatus;

  @Field()
  userService: HealthCheckStatus;

  @Field()
  orderService: HealthCheckStatus;
}
