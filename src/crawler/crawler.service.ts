import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Movie } from 'src/pages/movie/entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);

  constructor(
    private readonly http: HttpService,
    @InjectQueue('crawl') private crawlQueue: Queue,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async crawlAllPages() {
    let page = 1;
    while (true) {
      const url = `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`;
      const response = await lastValueFrom(this.http.get(url));
      const items = response.data.items;

      if (!items || items.length === 0) {
        console.log('✅ Hoàn tất crawl danh sách.');
        break;
      }

      for (const item of items) {
        this.saveMovie(item);
        await this.crawlQueue.add(
          'fetch-detail',
          { slug: item.slug },
          {
            attempts: 3,
            backoff: 5000,
            removeOnComplete: true,
          },
        );
      }

      console.log(`📄 Page ${page} → ${items.length} phim`);
      page++;
    }
  }

  async saveMovie(item) {
    try {
      const exists = await this.movieRepository.findOne({
        where: { slug: item.slug },
      });

      if (!exists) {
        const movie = this.movieRepository.create({
          name: item.name,
          slug: item.slug,
          origin_name: item.origin_name,
          thumb_url: item.thumb_url,
          poster_url: item.poster_url,
          year: item.year,
          tmdb: item.tmdb,
          imdb: item.imdb,
          modified_time: item.modified?.time
            ? new Date(item.modified.time)
            : null,
        });
        await this.movieRepository.save(movie);
        this.logger.log(`✅ Saved: ${item.name}`);
      } else {
        this.logger.log(`⏩ Skipped: ${item.name}`);
      }
    } catch (movieError) {
      this.logger.error(
        `❌ Lỗi khi lưu phim "${item.name}": ${movieError.message}`,
      );
    }
  }
}
