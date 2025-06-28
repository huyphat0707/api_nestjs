import { IsOptional } from 'class-validator';
import { MovieDetail } from 'src/pages/movie-detail/entities/movie-detail.entity';
import { Movie } from 'src/pages/movie/entities/movie.entity';
import { Post } from 'src/pages/post/entities/post.entity';
import { Product } from 'src/pages/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsOptional()
  name: string;

  @Column()
  @IsOptional()
  slug: string;

  @Column()
  @IsOptional()
  description: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @CreateDateColumn()
  @IsOptional()
  created_at: Date;

  @UpdateDateColumn()
  @IsOptional()
  updated_at: Date;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];

  @OneToMany(() => MovieDetail, (movieDetail) => movieDetail.category)
  movie_details: MovieDetail[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
