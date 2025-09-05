import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1755840810507 implements MigrationInterface {
    name = 'InitialMigration1755840810507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`choice\` DROP COLUMN \`alt_count\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`choice\` ADD \`alt_count\` int NOT NULL DEFAULT '0'`);
    }

}
