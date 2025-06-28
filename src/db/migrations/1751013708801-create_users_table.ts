import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1751013708801 implements MigrationInterface {
    name = 'CreateUsersTable1751013708801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`episodes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`server_name\` varchar(255) NULL, \`name\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`filename\` varchar(255) NULL, \`link_embed\` varchar(255) NULL, \`link_m3u8\` varchar(255) NULL, \`movie_detail_id\` int NULL, UNIQUE INDEX \`IDX_b7b57a08e09ff032ff5e0be1ca\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`countries\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`slug\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`origin_name\` varchar(255) NULL, \`thumb_url\` varchar(255) NULL, \`poster_url\` varchar(255) NULL, \`year\` int NULL, \`tmdb\` json NULL, \`imdb\` json NULL, \`modified_time\` datetime NULL, UNIQUE INDEX \`IDX_6ed86498aefe0e545548ca31b7\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movie_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tmdb\` json NULL, \`imdb\` json NULL, \`created\` datetime NULL, \`modified\` datetime NULL, \`name\` varchar(255) NULL, \`origin_name\` varchar(255) NULL, \`slug\` varchar(255) NOT NULL, \`type\` varchar(255) NULL, \`status\` varchar(255) NULL, \`thumb_url\` varchar(255) NULL, \`poster_url\` varchar(255) NULL, \`trailer_url\` varchar(255) NULL, \`time\` varchar(255) NULL, \`episode_current\` varchar(255) NULL, \`episode_total\` varchar(255) NULL, \`quality\` varchar(255) NULL, \`lang\` varchar(255) NULL, \`content\` text NULL, \`is_copyright\` tinyint NOT NULL DEFAULT 0, \`exclusive_sub\` tinyint NOT NULL DEFAULT 0, \`theater_screening\` tinyint NOT NULL DEFAULT 0, \`year\` int NULL, \`view\` int NOT NULL DEFAULT '0', \`category_id\` int NULL, \`country_id\` int NULL, \`movie_id\` int NULL, UNIQUE INDEX \`IDX_0f528b34846dd614f2e5b4b170\` (\`slug\`), UNIQUE INDEX \`REL_184f0b52b53d34f486db6c6e5f\` (\`movie_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`description\` varchar(255) NULL, \`price\` int NULL, \`quantity\` int NULL, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`category_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NULL, \`description\` varchar(255) NULL, \`thumbnail\` varchar(255) NULL, \`status\` int NOT NULL DEFAULT '1', \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NULL, \`category_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NULL, \`last_name\` varchar(255) NULL, \`email\` varchar(255) NULL, \`password\` varchar(255) NULL, \`roles\` varchar(255) NOT NULL DEFAULT 'user', \`is_verified\` tinyint NOT NULL DEFAULT 1, \`is_enabled\` tinyint NOT NULL DEFAULT 1, \`is_locked\` tinyint NOT NULL DEFAULT 0, \`failed_login_attempts\` int NOT NULL DEFAULT '0', \`is_active\` tinyint NOT NULL DEFAULT 1, \`refresh_token\` varchar(255) NULL, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`episodes\` ADD CONSTRAINT \`FK_58a077a2e0ce1b2083e2f605a5b\` FOREIGN KEY (\`movie_detail_id\`) REFERENCES \`movie_details\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movie_details\` ADD CONSTRAINT \`FK_437bfaece4338dd5c763b161499\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movie_details\` ADD CONSTRAINT \`FK_e3bcff81eca016c9ebc2b3d2c0c\` FOREIGN KEY (\`country_id\`) REFERENCES \`countries\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movie_details\` ADD CONSTRAINT \`FK_184f0b52b53d34f486db6c6e5fb\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_c4f9a7bd77b489e711277ee5986\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_852f266adc5d67c40405c887b49\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_852f266adc5d67c40405c887b49\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_c4f9a7bd77b489e711277ee5986\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`ALTER TABLE \`movie_details\` DROP FOREIGN KEY \`FK_184f0b52b53d34f486db6c6e5fb\``);
        await queryRunner.query(`ALTER TABLE \`movie_details\` DROP FOREIGN KEY \`FK_e3bcff81eca016c9ebc2b3d2c0c\``);
        await queryRunner.query(`ALTER TABLE \`movie_details\` DROP FOREIGN KEY \`FK_437bfaece4338dd5c763b161499\``);
        await queryRunner.query(`ALTER TABLE \`episodes\` DROP FOREIGN KEY \`FK_58a077a2e0ce1b2083e2f605a5b\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`REL_184f0b52b53d34f486db6c6e5f\` ON \`movie_details\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f528b34846dd614f2e5b4b170\` ON \`movie_details\``);
        await queryRunner.query(`DROP TABLE \`movie_details\``);
        await queryRunner.query(`DROP INDEX \`IDX_6ed86498aefe0e545548ca31b7\` ON \`movies\``);
        await queryRunner.query(`DROP TABLE \`movies\``);
        await queryRunner.query(`DROP TABLE \`countries\``);
        await queryRunner.query(`DROP INDEX \`IDX_b7b57a08e09ff032ff5e0be1ca\` ON \`episodes\``);
        await queryRunner.query(`DROP TABLE \`episodes\``);
    }

}
