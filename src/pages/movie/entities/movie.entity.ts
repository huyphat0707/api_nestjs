import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  origin_name: string;

  @Column()
  thumb_url: string;

  @Column()
  poster_url: string;

  @Column()
  year: number;

  @Column({ type: 'json', nullable: true })
  tmdb: object;

  @Column({ type: 'json', nullable: true })
  imdb: object;

  @Column({ type: 'datetime', nullable: true })
  modified_time: Date;
}
