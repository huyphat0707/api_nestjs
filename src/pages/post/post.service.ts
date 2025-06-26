import { User } from './../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async findByPaginate(query: FilterPostDto): Promise<any> {
    const items_per_page = query?.items_per_page
      ? Number(query.items_per_page)
      : 10;
    const page = query?.page ? Number(query.page) : 1;
    const search = query?.search ? query.search : '';
    const category = query?.category ? Number(query.category) : null;
    const skip = (page - 1) * items_per_page;
    const [res, total] = await this.postRepository.findAndCount({
      where: [
        {
          title: Like('%' + search + '%'),
          category: {
            id: category,
          },
        },
        {
          description: Like('%' + search + '%'),
          category: {
            id: category,
          },
        },
      ],
      order: { created_at: 'DESC' },
      take: items_per_page,
      skip: skip,
      relations: {
        user: true,
        category: true,
      },
      select: {
        category: {
          id: true,
          name: true,
        },
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    });

    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

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

  async createPost(payload: CreatePostDTO, userId: number): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id: userId });
    try {
      const data = await this.postRepository.save({
        ...payload,
        user,
      });
      if (!data) {
        throw new HttpException('Error saving post', HttpStatus.BAD_REQUEST);
      }
      return true;
    } catch (error) {
      throw new HttpException('Error saving post', HttpStatus.BAD_REQUEST);
    }
  }

  async findOneById(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'category'],
      select: {
        category: {
          id: true,
          name: true,
        },
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    });
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDTO,
  ): Promise<UpdateResult> {
    return await this.postRepository.update(id, updatePostDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.postRepository.delete(id);
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.postRepository.delete(id);
  }
}
