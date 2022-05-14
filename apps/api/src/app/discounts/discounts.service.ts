import {
  ICreateDiscountRequest,
  IDiscount,
  IUpdateDiscountRequest,
} from '@interfaces';
import { Discount } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

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
   * Find all discounts.
   * @returns a list of discounts.
   */
  async findAll(): Promise<IDiscount[]> {
    return this.discountsRepo.find();
  }

  /**
   * Update a Discount by their id
   * @param id id of the entity
   * @param request information for discount creation.
   * @returns entity or EntityNotFounderror
   */
  async update(
    id: string,
    request: IUpdateDiscountRequest
  ): Promise<IDiscount> {
    const {
      code,
      amount,
      type,
      remainingUses,
      startsAt,
      expiresAt,
      isEnabled,
    } = request;

    const discount = await this.discountsRepo.findOneOrFail({
      where: { discountId: id },
    });
    discount.code = code;
    discount.amount = amount;
    discount.type = type;
    discount.remainingUses = remainingUses;
    if (startsAt) {
      discount.startsAt = startsAt;
    }
    if (expiresAt) {
      discount.expiresAt = expiresAt;
    }
    discount.isEnabled = isEnabled;

    return this.discountsRepo.save(discount);
  }

  /**
   * Create and persist a discount entity.
   * @param request information for discount creation.
   * @returns created discount.
   */
  async create(request: ICreateDiscountRequest) {
    const newDiscount = this.discountsRepo.create(request);
    return this.discountsRepo.save(newDiscount);
  }

  /**
   * Delete a discount entity by its id.
   * @param id id of the discount.
   * @returns entity or EntityNotFound error.
   */
  async perish(id: string): Promise<void> {
    const response = await this.discountsRepo.delete({
      discountId: id,
    });

    if (response.affected === 0) {
      throw new EntityNotFoundError(Discount, id);
    }
  }
}
