import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/pages/movie/entities/movie.entity';
import { Repository } from 'typeorm';
import { MovieDetail } from 'src/pages/movie-detail/entities/movie-detail.entity';
import { Category } from 'src/pages/category/entities/category.entity';
import { Country } from 'src/pages/country/entities/country.entity';
import { Episode } from 'src/pages/movie-detail/entities/episodes.entity';

@Processor('crawl')
export class CrawlerProcessor {
  constructor(
    private http: HttpService,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(MovieDetail)
    private movieDetailRepository: Repository<MovieDetail>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Country) private countryRepository: Repository<Country>,
    @InjectRepository(Episode) private episodeRepository: Repository<Episode>,
  ) {}

  @Process('fetch-detail')
  async handle(job: Job<{ slug: string }>) {
    const { slug } = job.data;
    try {
      const foundMovie = await this.movieRepository.findOne({
        where: { slug },
      });
      if (!foundMovie) {
        console.warn(`❌ Không tìm thấy movie với slug ${slug}`);
        return;
      }

      const res = await lastValueFrom(
        this.http.get(`https://ophim1.com/phim/${slug}`),
      );
      const { movie, episodes } = res.data;
      let category = null;
      if (movie.category?.[0]) {
        category = await this.categoryRepository.findOne({
          where: { slug: movie.category[0].slug },
        });
        if (!category) {
          category = this.categoryRepository.create({
            name: movie.category[0].name,
            slug: movie.category[0].slug,
          });
          await this.categoryRepository.save(category);
        }
      }

      let country = null;
      if (movie.country?.[0]) {
        country = await this.countryRepository.findOne({
          where: { slug: movie.country[0].slug },
        });
        if (!country) {
          country = this.countryRepository.create({
            name: movie.country[0].name,
            slug: movie.country[0].slug,
          });
          await this.countryRepository.save(country);
        }
      }
      const existMovieDetail = this.movieDetailRepository.findOne({
        where: { slug: slug },
      });
      let savedDetail;
      if (!existMovieDetail) {
        const movieDetail = this.movieDetailRepository.create({
          movie: foundMovie,
          slug: movie.slug,
          name: movie.name,
          origin_name: movie.origin_name,
          content: movie.content,
          type: movie.type,
          status: movie.status,
          thumb_url: movie.thumb_url,
          poster_url: movie.poster_url,
          trailer_url: movie.trailer_url,
          time: movie.time,
          episode_current: movie.episode_current,
          episode_total: movie.episode_total,
          quality: movie.quality,
          lang: movie.lang,
          is_copyright: movie.is_copyright,
          exclusive_sub: movie.sub_docquyen,
          theater_screening: movie.chieurap,
          year: movie.year,
          view: movie.view,
          tmdb: movie.tmdb,
          imdb: movie.imdb,
          created: new Date(movie.created?.time),
          modified: new Date(movie.modified?.time),
          category: category,
          country: country,
        });

        savedDetail = await this.movieDetailRepository.save(movieDetail);
      } else {
        savedDetail = existMovieDetail;
      }

      const episodeEntities: Episode[] = [];
      const episodeData = episodes?.[0]?.server_data || [];
      for (const ep of episodeData) {
        episodeEntities.push(
          this.episodeRepository.create({
            movie_detail: savedDetail,
            name: ep.name,
            slug: ep.slug,
            filename: ep.filename,
            link_embed: ep.link_embed,
            link_m3u8: ep.link_m3u8,
          }),
        );
      }

      if (episodeEntities.length) {
        await this.episodeRepository.save(episodeEntities);
      }

      console.log(
        `✅ Saved detail + ${episodeEntities.length} episodes for ${slug}`,
      );
      console.log(`✅ Saved detail for ${slug}`);
    } catch (error) {
      console.error(`❌ Lỗi khi crawl ${slug}:`, error.message);
      throw error;
    }
  }
}
