import { Injectable } from '@nestjs/common';
import { CreateMovieDetailDto } from './dto/create-movie-detail.dto';
import { UpdateMovieDetailDto } from './dto/update-movie-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieDetail } from './entities/movie-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovieDetailService {
  constructor(
    @InjectRepository(MovieDetail)
    private movieDetailRepository: Repository<MovieDetail>,
  ) {}
  create(createMovieDetailDto: CreateMovieDetailDto) {
    return 'This action adds a new movieDetail';
  }

  findAll() {
    return `This action returns all movieDetail`;
  }

  async findOne(slug: string): Promise<MovieDetail> {
    return await this.movieDetailRepository.findOne({ where: { slug } });
  }

  update(id: number, updateMovieDetailDto: UpdateMovieDetailDto) {
    return `This action updates a #${id} movieDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieDetail`;
  }
}
