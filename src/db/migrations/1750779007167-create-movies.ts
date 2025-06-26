import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMovies1750779007167 implements MigrationInterface {
  name = 'CreateMovies1750779007167';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`movies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`origin_name\` varchar(255) NOT NULL, \`thumb_url\` varchar(255) NOT NULL, \`poster_url\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`tmdb\` json NULL, \`imdb\` json NULL, \`modified_time\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`categoryId\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`categoryId\``,
    );
    await queryRunner.query(`DROP TABLE \`movies\``);
  }
}
