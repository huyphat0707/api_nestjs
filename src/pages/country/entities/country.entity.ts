import { MovieDetail } from 'src/pages/movie-detail/entities/movie-detail.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  slug: string;

  @OneToMany(() => MovieDetail, (movie_detail) => movie_detail.country)
  movie_details: MovieDetail;
}
