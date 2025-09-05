import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1757053792464 implements MigrationInterface {
    name = 'InitialMigration1757053792464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`choice\` (\`index\` int NOT NULL AUTO_INCREMENT, \`id\` int NULL, \`imageUrl\` text NULL, \`description\` varchar(255) NOT NULL, \`count\` int NOT NULL DEFAULT '0', \`balanceGameId\` int NULL, PRIMARY KEY (\`index\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`balance_game\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`choice\` ADD CONSTRAINT \`FK_171dd03e416fdb88f134de5c62d\` FOREIGN KEY (\`balanceGameId\`) REFERENCES \`balance_game\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`choice\` DROP FOREIGN KEY \`FK_171dd03e416fdb88f134de5c62d\``);
        await queryRunner.query(`DROP TABLE \`balance_game\``);
        await queryRunner.query(`DROP TABLE \`choice\``);
    }

}
