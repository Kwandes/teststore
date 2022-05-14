import { IDiscount } from '@interfaces';
import { Discount } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { discounts } from '../constants/discounts.constant';

@Injectable()
export class DiscountsSeederService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>
  ) {}

  create(): Array<Promise<Discount>> {
    return discounts.map(async (discount: IDiscount) => {
      try {
        return await this.discountRepository.save(discount);
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
