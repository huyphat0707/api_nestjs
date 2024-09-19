import { Injectable, Logger } from '@nestjs/common';
import { CronExpression } from '@nestjs/schedule';
import * as Cron from 'cron';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor() {
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
