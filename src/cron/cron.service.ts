import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Movie } from 'src/pages/movie/entities/movie.entity';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async onModuleInit() {
    this.logger.log('Cron service initialized');
    // await this.getMovies();
  }

//   @Cron(CronExpression.EVERY_10_MINUTES)
  public async handleCron() {
    this.logger.log('Cron job executed');
    // await this.runCron();
  }

  public async stopCron() {
    this.logger.log('stop cron job');
    // Add logic to stop the cron job if needed
  }
  public async restartCron() {
    this.logger.log('restart cron job');
    // Add logic to restart the cron job if needed
  }

  public async getMovies() {
    this.logger.log('Fetching movies from API');
    try {
      const firstResponse = await firstValueFrom(
        this.httpService.get(
          'https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1',
        ),
      );
      const totalPages = firstResponse.data.pagination.totalPages;
      this.logger.log(`Total pages: ${totalPages}`);
      for (let i = 300; i <= totalPages; i++) {
        await this.fetchAndSaveMovies(i);
      }
      this.logger.log('All movies fetched and saved successfully');
    } catch (error) {
      this.logger.error('Failed to fetch movies', error);
    }
  }
  private async fetchAndSaveMovies(page: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`,
        ),
      );
      const movies = response.data.items;

      for (const item of movies) {
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
    } catch (error) {
      this.logger.error(`❌ Lỗi khi fetch trang ${page}: ${error.message}`);
    }
  }
}
