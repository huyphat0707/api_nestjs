import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MovieDetail } from './movie-detail.entity';

@Entity('episodes')
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  server_name: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  link_embed: string;

  @Column({ nullable: true })
  link_m3u8: string;

  @ManyToOne(() => MovieDetail, (movie) => movie.episodes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_detail_id' })
  movie_detail: MovieDetail;
}
