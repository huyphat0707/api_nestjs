import { FilterCategoryDto } from './dto/filter-category.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findByPaginate(query: FilterCategoryDto): Promise<any> {
    const items_per_page = query.items_per_page
      ? Number(query.items_per_page)
      : 10;
    const page = query.page ? Number(query.page) : 1;
    const keyword = query.search ? query.search : '';
    const skip = (page - 1) * items_per_page;
    const [res, total] = await this.categoryRepository.findAndCount({
      where: [
        { name: Like('%' + keyword + '%') },
        { description: Like('%' + keyword + '%') },
      ],
      order: { created_at: 'DESC' },
      take: items_per_page,
      skip: skip,
      select: ['id', 'name', 'description'],
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      data: res,
      pagination: {
        total,
        currentPage: page,
        nextPage,
        prevPage,
        lastPage,
      },
    };
  }

  async findOneById(id: number): Promise<Category | undefined> {
    return await this.categoryRepository.findOneBy({ id: id });
  }

  async create(createUserDto: CreateCategoryDto): Promise<boolean> {
    try {
      const data = await this.categoryRepository.save(createUserDto); // Directly save DTO
      if (!data) {
        throw new Error('Error saving category');
      }
      return true;
    } catch (error) {
      throw new Error(`Error saving category: ${error.message}`);
    }
  }

  async update(createUserDto: CreateCategoryDto, id: number): Promise<boolean> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new Error('Category not found');
    }

    const data = await this.categoryRepository.update(id, createUserDto);

    if (!data) {
      throw new Error('Error retrieving updated category');
    }

    return true;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }
}
