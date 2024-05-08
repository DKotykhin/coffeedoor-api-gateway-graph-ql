import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { HasRoles } from '../auth/decorators/roles.decorator';
import { RoleTypes } from '../common/types/enums';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { StatusResponse } from '../common/entities/status-response.entity';

import { OrderItemService } from './order-item.service';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItem } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Resolver()
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(GqlAuthGuard, RolesGuard)
export class OrderItemResolver {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Query(() => OrderItem)
  async getOrderItemById(@Args('id') id: string): Promise<OrderItem> {
    return this.orderItemService.findOrderItemById(id);
  }

  @Query(() => [OrderItem])
  async getOrderItemsByOrderId(
    @Args('orderId') orderId: string,
  ): Promise<OrderItem[]> {
    return this.orderItemService.findOrderItemsByOrderId(orderId);
  }

  @Mutation(() => OrderItem)
  async createOrderItem(
    @Args('orderItem') orderItem: CreateOrderItem,
  ): Promise<OrderItem> {
    return this.orderItemService.createOrderItem(orderItem);
  }

  @Mutation(() => OrderItem)
  async updateOrderItem(
    @Args('orderItem') orderItem: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    return this.orderItemService.updateOrderItem(orderItem);
  }

  @Mutation(() => StatusResponse)
  async deleteOrderItem(@Args('id') id: string): Promise<StatusResponse> {
    return this.orderItemService.deleteOrderItem(id);
  }
}
