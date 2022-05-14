import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { DeliveryTypeEnum } from './delivery-type.enum';
import { ICreateOrderRequest, IUpdateOrderRequest } from './orders.interface';

export class CreateOrderRequest implements ICreateOrderRequest {
  @MaxLength(254)
  @IsNotEmpty()
  email!: string;

  @IsInt({ each: true })
  items!: number[];

  @Min(0)
  @Max(666666)
  @IsNumber({ maxDecimalPlaces: 2 })
  total!: number;

  @Min(0)
  @Max(666666)
  @IsNumber({ maxDecimalPlaces: 2 })
  subtotal!: number;

  @IsEnum(DeliveryTypeEnum)
  @IsNotEmpty()
  deliveryType!: DeliveryTypeEnum;

  @IsNotEmpty()
  @IsUUID()
  @IsOptional()
  discountId?: string;
}

export class UpdateOrderRequest implements IUpdateOrderRequest {
  @MaxLength(254)
  @IsNotEmpty()
  email!: string;

  @IsInt({ each: true })
  items!: number[];

  @Min(0)
  @Max(666666)
  @IsNumber({ maxDecimalPlaces: 2 })
  total!: number;

  @Min(0)
  @Max(666666)
  @IsNumber({ maxDecimalPlaces: 2 })
  subtotal!: number;

  @IsEnum(DeliveryTypeEnum)
  @IsNotEmpty()
  deliveryType!: DeliveryTypeEnum;

  @IsNotEmpty()
  @IsUUID()
  @IsOptional()
  discountId?: string;
}
