import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RoleTypes } from '../common/types/enums';
import { StatusResponse } from '../common/entities/status-response.entity';
import { IdDto } from '../common/dto/id.dto';

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
  async getOrderItemById(@Args('idDto') idDto: IdDto): Promise<OrderItem> {
    return this.orderItemService.findOrderItemById(idDto.id);
  }

  @Query(() => [OrderItem])
  async getOrderItemsByOrderId(
    @Args('orderIdDto') orderIdDto: IdDto,
  ): Promise<OrderItem[]> {
    return this.orderItemService.findOrderItemsByOrderId(orderIdDto.id);
  }

  @Mutation(() => OrderItem)
  async createOrderItem(
    @Args('createOrderItem') createOrderItem: CreateOrderItem,
  ): Promise<OrderItem> {
    return this.orderItemService.createOrderItem(createOrderItem);
  }

  @Mutation(() => OrderItem)
  async updateOrderItem(
    @Args('updateOrderItemDto') updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    return this.orderItemService.updateOrderItem(updateOrderItemDto);
  }

  @Mutation(() => StatusResponse)
  async deleteOrderItem(@Args('idDto') idDto: IdDto): Promise<StatusResponse> {
    return this.orderItemService.deleteOrderItem(idDto.id);
  }
}
