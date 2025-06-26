import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';
import { FilterMovieDto } from './dto/filter-movie.dto';

@Controller('api/movies')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get()
  @ApiOperation({
    summary: 'Retrieve movies public',
    description: `
      This endpoint retrieves a list of movies with optional pagination and filtering.
      - **page**: The page number to retrieve (default is 1).
      - **items_per_page**: The number of items per page (default is 10).
      - **search**: A search term to filter movies by name or origin name.
    `,
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'items_per_page', required: false })
  @ApiQuery({ name: 'search', required: false })
  async findByPaginate(@Query() query: FilterMovieDto): Promise<Movie[]> {
    return await this.movieService.findByPaginate(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }
}
