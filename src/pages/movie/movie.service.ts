import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Like, Repository } from 'typeorm';
import { FilterMovieDto } from './dto/filter-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async findByPaginate(query: FilterMovieDto): Promise<any> {
    const items_per_page = query?.items_per_page
      ? Number(query.items_per_page)
      : 10;
    const page = query?.page ? Number(query.page) : 1;
    const search = query?.search ? query.search : '';
    const skip = (page - 1) * items_per_page;
    const [res, total] = await this.movieRepository.findAndCount({
      where: [
        {
          name: Like('%' + search + '%'),
        },
        {
          origin_name: Like('%' + search + '%'),
        },
      ],
      order: { year: 'DESC' },
      take: items_per_page,
      skip: skip,
    });

    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      pathImage: 'https://img.ophim.live/uploads/movies',
      pagination: {
        total,
        currentPage: page,
        nextPage,
        prevPage,
        lastPage,
      },
    };
  }
  findOne(id: number) {
    return this.movieRepository.findOne({ where: { id } });
  }
}
