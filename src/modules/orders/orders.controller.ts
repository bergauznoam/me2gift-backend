import { CreateOrderDto, OrderDto, UpdateOrderStateDto } from "@DTOs/Order.dto";
import { appConfiguration } from "@config/app.conf";
import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { AdminPermission } from "@root/roles.decorator";
import { OrdersService } from "@services/orders.service";
import { ValidationError, isEmail } from "class-validator";

@Controller("orders")
@ApiTags("Orders")
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) { }

    @Get()
    @ApiHeader({ name: appConfiguration.jwtAccessTokenHeaderName })
    @AdminPermission()
    public async getOrders(): Promise<OrderDto[]> {
        return (await this.ordersService.get()).map(o => o.format());
    }

    @Get(':id')
    @ApiHeader({ name: appConfiguration.jwtAccessTokenHeaderName })
    @AdminPermission()
    public async getOrderById(@Param('id') id: string): Promise<OrderDto> {
        return this.ordersService.getById(id);
    }

    @Get(':email')
    public async getOrdersByEmail(@Param('email') email: string): Promise<OrderDto[]> {
        if (!isEmail(email)) {
            const error = new ValidationError();
            error.property = "email";
            error.constraints = {
                isEmail: "email property must be an email"
            }
            throw error;
        }
        return (await this.ordersService.getOrdersByEmail(email)).map(o => o.format());
    }

    @Post()
    public async createOrder(@Body() createRequest: CreateOrderDto): Promise<OrderDto> {
        const order = await this.ordersService.create(createRequest);
        return order.format();
    }

    @Put(':id')
    @ApiHeader({ name: appConfiguration.jwtAccessTokenHeaderName })
    @AdminPermission()
    public async updateOrderState(
        @Param('id') id: string,
        @Body() updateOrderStateRequest: UpdateOrderStateDto
    ): Promise<OrderDto> {
        const order = await this.ordersService.updateOrderState(id, updateOrderStateRequest.state);
        return order.format();
    }

    @Delete(':id')
    @ApiHeader({ name: appConfiguration.jwtAccessTokenHeaderName })
    @AdminPermission()
    public deleteCategory(@Param('id') id: string): Promise<void> {
        return this.ordersService.delete(id);
    }
}
