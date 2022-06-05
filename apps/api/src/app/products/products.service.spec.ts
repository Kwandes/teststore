import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';
import { products } from './products.constant';
import { ProductsService as Service } from './products.service';

// set the timeout to cover request that take longer to perform
jest.setTimeout(30000);

// Declare the mock of the HttpModule dependency, axios
jest.mock('axios');

describe('Products Service', () => {
  // Reference variables used for spying
  let service: Service;
  let httpService: HttpService;

  // Reference to the mocked HttpModule dependency, axios
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [Service],
    }).compile();
    // Set the references
    service = module.get<Service>(Service);
    httpService = module.get<HttpService>(HttpService);
  });

  // Clean up the mocks, resetting the "timesCalled" counter for httpService
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call httpService.get 1 time"', async () => {
      // A bit of funky casting to get around issues with strict mode requiring very specific data formats
      mockedAxios.get.mockReturnValueOnce({
        data: products,
      } as unknown as Promise<unknown>);
      jest.spyOn(httpService, 'get');

      await firstValueFrom(service.findAll());
      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://fakestoreapi.com/products'
      );
    });

    it('should call httpService.get and receive a list of products"', async () => {
      // A bit of funky casting to get around issues with strict mode requiring very specific data formats
      mockedAxios.get.mockReturnValueOnce({
        data: products,
      } as unknown as Promise<unknown>);

      const response = await firstValueFrom(service.findAll());
      expect(response).toEqual(products);
    });
  });

  describe('findOne()', () => {
    const productId = '1'; //  corresponds to products[0]
    it('should call httpService.get 1 time"', async () => {
      // A bit of funky casting to get around issues with strict mode requiring very specific data formats
      mockedAxios.get.mockReturnValueOnce({
        data: products[0],
      } as unknown as Promise<unknown>);
      jest.spyOn(httpService, 'get');

      await service.findOne(productId);
      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toHaveBeenCalledWith(
        `https://fakestoreapi.com/products/${productId}`
      );
    });

    it('should call httpService.get and receive a single product"', async () => {
      // A bit of funky casting to get around issues with strict mode requiring very specific data formats
      mockedAxios.get.mockReturnValueOnce({
        data: products[0],
      } as unknown as Promise<unknown>);

      const response = await service.findOne(productId);
      expect(response).toEqual(products[0]);
    });
  });
});
