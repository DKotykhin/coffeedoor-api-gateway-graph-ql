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
  CreateOrderRequest,
  ORDER_SERVICE_NAME,
  Order,
  OrderServiceClient,
  StatusResponse,
  UpdateOrderRequest,
} from './order.pb';

@Injectable()
export class OrderService implements OnModuleInit {
  private orderService: OrderServiceClient;
  protected readonly logger = new Logger(OrderService.name);
  constructor(
    @Inject('ORDER_SERVICE')
    private readonly orderServiceClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.orderService = this.orderServiceClient.getService(ORDER_SERVICE_NAME);
  }

  async findOrderById(id: string): Promise<Order> {
    try {
      const response = await firstValueFrom(
        this.orderService.getOrderById({ id }),
      );
      return response;
    } catch (error) {
      this.logger.error(error.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async findOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const { orderList } = await firstValueFrom(
        this.orderService.getOrdersByUserId({ id: userId }),
      );
      return orderList;
    } catch (error) {
      this.logger.error(error.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async createOrder(order: CreateOrderRequest): Promise<Order> {
    try {
      const response = await firstValueFrom(
        this.orderService.createOrder(order),
      );
      return response;
    } catch (error) {
      this.logger.error(error.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async updateOrder(order: UpdateOrderRequest): Promise<Order> {
    try {
      const response = await firstValueFrom(
        this.orderService.updateOrder(order),
      );
      return response;
    } catch (error) {
      this.logger.error(error.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async deleteOrder(id: string): Promise<StatusResponse> {
    try {
      const response = await firstValueFrom(
        this.orderService.deleteOrder({ id }),
      );
      return response;
    } catch (error) {
      this.logger.error(error.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }
}
