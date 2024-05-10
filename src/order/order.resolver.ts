import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/auth.pb';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RoleTypes } from '../common/types/enums';
import { StatusResponse } from '../common/entities/status-response.entity';

import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { OrderWithItems } from './entities/order-with-items.entity';
import { CreateOrderItemDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Resolver()
@UseGuards(GqlAuthGuard)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [OrderWithItems])
  async getOrdersByUserId(@GetUser() user: User): Promise<OrderWithItems[]> {
    return this.orderService.findOrdersByUserId(user.id);
  }

  @Query(() => OrderWithItems)
  @HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
  async getOrderById(@Args('id') id: string): Promise<OrderWithItems> {
    return this.orderService.findOrderById(id);
  }

  @Mutation(() => Order)
  async createOrder(
    @GetUser() user: User,
    @Args('order') order: CreateOrderItemDto,
  ): Promise<Order> {
    return this.orderService.createOrder({
      ...order,
      userOrder: {
        ...order.userOrder,
        userId: user.id,
      },
    });
  }

  @Mutation(() => Order)
  @HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
  async updateOrder(@Args('order') order: UpdateOrderDto): Promise<Order> {
    return this.orderService.updateOrder(order);
  }

  @Mutation(() => StatusResponse)
  @HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
  async deleteOrder(@Args('id') id: string): Promise<StatusResponse> {
    return this.orderService.deleteOrder(id);
  }
}
