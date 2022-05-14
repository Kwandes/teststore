import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { DiscountTypeEnum } from './discount-type.enum';
import {
  ICreateDiscountRequest,
  IUpdateDiscountRequest,
} from './discounts.interface';

export class CreateDiscountRequest implements ICreateDiscountRequest {
  @MaxLength(50)
  @IsNotEmpty()
  code!: string;

  @IsInt()
  @Min(0)
  @Max(666666)
  @IsNotEmpty()
  amount!: number;

  @IsEnum(DiscountTypeEnum)
  type!: DiscountTypeEnum;

  @IsInt()
  @Min(0)
  @Max(666666)
  @IsNotEmpty()
  remainingUses!: number;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  startsAt?: Date;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  expiresAt?: Date;

  @IsBoolean()
  @IsNotEmpty()
  isEnabled!: boolean;
}

export class UpdateDiscountRequest implements IUpdateDiscountRequest {
  @MaxLength(50)
  @IsNotEmpty()
  code!: string;

  @IsInt()
  @Min(0)
  @Max(666666)
  @IsNotEmpty()
  amount!: number;

  @IsEnum(DiscountTypeEnum)
  type!: DiscountTypeEnum;

  @IsInt()
  @Min(0)
  @Max(666666)
  @IsNotEmpty()
  remainingUses!: number;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  startsAt?: Date;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  expiresAt?: Date;

  @IsBoolean()
  @IsNotEmpty()
  isEnabled!: boolean;
}
