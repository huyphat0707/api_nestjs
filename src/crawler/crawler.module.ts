import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { CrawlerService } from './crawler.service';
import { CrawlerProcessor } from './crawler.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/pages/movie/entities/movie.entity';
import { MovieDetail } from 'src/pages/movie-detail/entities/movie-detail.entity';
import { Category } from 'src/pages/category/entities/category.entity';
import { Episode } from 'src/pages/movie-detail/entities/episodes.entity';
import { Country } from 'src/pages/country/entities/country.entity';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'crawl',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TypeOrmModule.forFeature([Movie, MovieDetail, Category, Episode, Country])
  ],
  providers: [CrawlerService, CrawlerProcessor],
  exports: [CrawlerService],
})
export class CrawlerModule {}
