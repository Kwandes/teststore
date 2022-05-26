import { IDiscount } from '@interfaces';
import { Discount } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountsRepo: Repository<IDiscount>
  ) {}

  /**
   * Find a singular discount by their id.
   * @param id id of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOne(id: string): Promise<IDiscount> {
    return this.discountsRepo.findOneOrFail({
      where: { discountId: id },
    });
  }

  /**
   * Find a singular discount by their code.
   * @param code code of the entity.
   * @returns entity or EntityNotFound error.
   */
  async findOneByCode(code: string): Promise<IDiscount> {
    return this.discountsRepo.findOneOrFail({
      where: { code: code },
    });
  }

  /**
   * Find all discounts.
   * @returns a list of discounts.
   */
  async findAll(): Promise<IDiscount[]> {
    return this.discountsRepo.find();
  }
}
