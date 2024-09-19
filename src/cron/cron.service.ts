import { Injectable, Logger } from '@nestjs/common';
import { CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as Cron from 'cron';
import { Movie } from 'src/movie/entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {
    this.handleCron();
  }
  private async handleCron() {
    //https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1
    const job = new Cron.CronJob(CronExpression.EVERY_5_SECONDS, () => {
      this.logger.log('cron job');
    });
    job.stop();
  }
}
