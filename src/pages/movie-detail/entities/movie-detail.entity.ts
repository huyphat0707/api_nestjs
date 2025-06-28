import { Category } from 'src/pages/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Episode } from './episodes.entity';
import { Country } from 'src/pages/country/entities/country.entity';
import { Movie } from 'src/pages/movie/entities/movie.entity';

@Entity('movie_details')
export class MovieDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', nullable: true })
  tmdb: object;

  @Column({ type: 'json', nullable: true })
  imdb: object;

  @Column({ type: 'datetime', nullable: true })
  created: Date;

  @Column({ type: 'datetime', nullable: true })
  modified: Date;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  origin_name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  thumb_url: string;

  @Column({ nullable: true })
  poster_url: string;

  @Column({ nullable: true })
  trailer_url: string;

  @Column({ nullable: true })
  time: string;

  @Column({ nullable: true })
  episode_current: string;

  @Column({ nullable: true })
  episode_total: string;

  @Column({ nullable: true })
  quality: string;

  @Column({ nullable: true })
  lang: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ default: false })
  is_copyright: boolean;

  @Column({ default: false })
  exclusive_sub: boolean;

  @Column({ default: false })
  theater_screening: boolean;

  @Column({ nullable: true })
  year: number;

  @Column({ default: 0 })
  view: number;

  @ManyToOne(() => Category, (category) => category.movie_details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Episode, (episode) => episode.movie_detail)
  episodes: Episode[];

  @ManyToOne(() => Country, (country) => country.movie_details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @OneToOne(() => Movie, (movie) => movie.movie_detail, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}
