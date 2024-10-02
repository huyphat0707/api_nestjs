import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ProductDto {
  id?: number;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @MaxLength(255)
  description: string;
  price: number;
  quantity: number;
  category_id: number;
}
