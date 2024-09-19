import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async findOneById(id: number): Promise<Product | undefined> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete({ id });
  }
}
