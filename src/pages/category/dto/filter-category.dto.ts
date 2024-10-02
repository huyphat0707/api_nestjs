import { IsOptional } from 'class-validator';

export class FilterCategoryDto {
  @IsOptional()
  readonly page?: string;

  @IsOptional()
  readonly items_per_page?: number;

  @IsOptional()
  readonly search?: string;
}
