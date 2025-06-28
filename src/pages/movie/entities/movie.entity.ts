import { MovieDetail } from 'src/pages/movie-detail/entities/movie-detail.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  origin_name: string;

  @Column({ nullable: true })
  thumb_url: string;

  @Column({ nullable: true })
  poster_url: string;

  @Column({ nullable: true })
  year: number;

  @Column({ type: 'json', nullable: true })
  tmdb: object;

  @Column({ type: 'json', nullable: true })
  imdb: object;

  @Column({ type: 'datetime', nullable: true })
  modified_time: Date;

  @OneToOne(() => MovieDetail, (detail) => detail.movie)
  movie_detail: MovieDetail;
}
