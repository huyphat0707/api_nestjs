import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieDetailService } from './movie-detail.service';
import { CreateMovieDetailDto } from './dto/create-movie-detail.dto';
import { UpdateMovieDetailDto } from './dto/update-movie-detail.dto';
import { MovieDetail } from './entities/movie-detail.entity';

@Controller('movie-detail')
export class MovieDetailController {
  constructor(private readonly movieDetailService: MovieDetailService) {}

  @Post()
  create(@Body() createMovieDetailDto: CreateMovieDetailDto) {
    return this.movieDetailService.create(createMovieDetailDto);
  }

  @Get()
  findAll() {
    return this.movieDetailService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string): Promise<MovieDetail> {
    return this.movieDetailService.findOne(slug);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieDetailDto: UpdateMovieDetailDto,
  ) {
    return this.movieDetailService.update(+id, updateMovieDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieDetailService.remove(+id);
  }
}
