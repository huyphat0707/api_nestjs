import { IsOptional } from 'class-validator';

export class FilterMovieDto {
  @IsOptional()
  page: string;

  @IsOptional()
  items_per_page: string;

  @IsOptional()
  search: string;
}
