import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { errorCodeImplementation } from '../utils/error-code-implementation';
import {
  CreateOrderItemRequest,
  ORDER_ITEM_SERVICE_NAME,
  OrderItem,
  OrderItemServiceClient,
  StatusResponse,
  UpdateOrderItemRequest,
} from './order-item.pb';

@Injectable()
export class OrderItemService implements OnModuleInit {
  private orderItemService: OrderItemServiceClient;
  protected readonly logger = new Logger(OrderItemService.name);
  constructor(
    @Inject('ORDER_ITEM_SERVICE')
    private readonly orderItemServiceClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.orderItemService = this.orderItemServiceClient.getService(
      ORDER_ITEM_SERVICE_NAME,
    );
  }

  async findOrderItemById(id: string): Promise<OrderItem> {
    try {
      const response = await firstValueFrom(
        this.orderItemService.getOrderItemById({ id }),
      );
      return response;
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async findOrderItemsByOrderId(orderId: string): Promise<OrderItem[]> {
    try {
      const { orderItemList } = await firstValueFrom(
        this.orderItemService.getOrderItemsByOrderId({ id: orderId }),
      );
      return orderItemList;
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async createOrderItem(orderItem: CreateOrderItemRequest): Promise<OrderItem> {
    try {
      const response = await firstValueFrom(
        this.orderItemService.createOrderItem(orderItem),
      );
      return response;
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async updateOrderItem(orderItem: UpdateOrderItemRequest): Promise<OrderItem> {
    try {
      const response = await firstValueFrom(
        this.orderItemService.updateOrderItem(orderItem),
      );
      return response;
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async deleteOrderItem(id: string): Promise<StatusResponse> {
    try {
      const response = await firstValueFrom(
        this.orderItemService.deleteOrderItem({ id }),
      );
      return response;
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }
}
