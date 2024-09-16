import { IsOptional } from 'class-validator';

export class FilterUserDto {
  @IsOptional()
  readonly page?: string;

  @IsOptional()
  readonly items_per_page?: number;

  @IsOptional()
  readonly search?: string;
}
