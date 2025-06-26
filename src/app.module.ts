import { dataSourceOptions } from './db/data-source';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './pages/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './pages/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './pages/post/post.module';
import { CategoryModule } from './pages/category/category.module';
import { ProductModule } from './pages/product/product.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { MovieModule } from './pages/movie/movie.module';
import { HttpModule } from '@nestjs/axios';
import { Movie } from './pages/movie/entities/movie.entity';

@Module({
  controllers: [AppController],
  providers: [AppService, CronService],
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    PostModule,
    CategoryModule,
    ProductModule,
    MovieModule,
    HttpModule,
    TypeOrmModule.forFeature([Movie]),
  ],
})
export class AppModule {}
