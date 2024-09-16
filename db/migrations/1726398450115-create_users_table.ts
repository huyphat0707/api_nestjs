import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1726398450115 implements MigrationInterface {
  name = 'CreateUsersTable1726398450115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`roles\` varchar(255) NOT NULL DEFAULT 'user', \`isVerified\` tinyint NOT NULL DEFAULT 1, \`isEnabled\` tinyint NOT NULL DEFAULT 1, \`isLocked\` tinyint NOT NULL DEFAULT 0, \`failedLoginAttempts\` int NOT NULL DEFAULT '0', \`isActive\` tinyint NOT NULL DEFAULT 1, \`refresh_token\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
