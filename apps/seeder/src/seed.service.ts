import { Injectable, Logger } from '@nestjs/common';
import { Connection, getManager } from 'typeorm';
import { DiscountsSeederService } from './services/discounts.service';
import { OrdersSeederService } from './services/orders.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly logger: Logger,
    private readonly connection: Connection,
    private readonly discountsService: DiscountsSeederService,
    private readonly ordersService: OrdersSeederService
  ) {}

  // ========================
  // === MAIN SEED METHOD ===
  async seed() {
    // Clear database
    await this.resetDatabase();

    // Seed the entities
    // has to be done in specific order for proper relationship data population
    await this.seedDiscounts();
    await this.seedOrders();
  }

  // ====================================
  // === DATABASE MANAGEMENT METHODS ====

  async getEntities() {
    const entities = [];
    try {
      this.connection.entityMetadatas.forEach((entity) =>
        entities.push({
          name: entity.name,
          tableName: entity.tableName,
        })
      );
      return entities;
    } catch (error) {
      this.logger.error(error, 'Unable to retrieve database metadata');
      return [];
    }
  }

  /**
   * Cleans all the entities
   * Removes all data from database
   */
  private async cleanAll(entities) {
    try {
      const dbType = this.connection.options.type;
      const manager = getManager();
      const tables = entities.map((entity) => '"' + entity.tableName + '"');

      if (dbType === 'mysql') {
        // Can't delete from nor truncate multiple tables at once
        // Can't truncate due to foreign key constraints
        for (const table of tables) {
          const query = `DELETE FROM ` + table.replaceAll(`"`, ``) + ';';
          await manager.query(query);
          console.log(`${table} has perished`);
        }
      }

      if (dbType === 'postgres') {
        const truncateSql = `TRUNCATE TABLE ${tables.join(
          ','
        )} RESTART IDENTITY CASCADE;`;
        await manager.query(truncateSql);
      }

      if (dbType === 'sqlite') {
        // There is no SQLite specific TRUNCATE TABLE command
        // Setting in typeorm config `dropSchema: true` clears database
      }
    } catch (error) {
      this.logger.error(error, 'Unable to clean database');
    }
  }

  /**
   * Reset the database, truncate all tables (remove all data)
   */
  async resetDatabase() {
    this.logger.debug('RESETTING DATABASE');

    const entities = await this.getEntities();
    await this.cleanAll(entities);

    this.logger.debug('✅ DATABASE RESET SUCCESSFUL');
  }

  // ====================================
  // === ENTITY SEEDING METHODS ====
  async seedDiscounts() {
    try {
      const response = await Promise.all(this.discountsService.create());
      this.logger.debug(`✅ Discounts created: ${response.length}`);
      return response;
    } catch (error) {
      this.logger.warn(`❌ Discounts failed to seed`);
      this.logger.error(error);
    }
  }

  async seedOrders() {
    try {
      const response = await Promise.all(this.ordersService.create());
      this.logger.debug(`✅ Orders created: ${response.length}`);
      return response;
    } catch (error) {
      this.logger.warn(`❌ Orders failed to seed`);
      this.logger.error(error);
    }
  }
}
