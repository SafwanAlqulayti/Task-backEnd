import {MigrationInterface, QueryRunner} from "typeorm";

export class e1597933167585 implements MigrationInterface {
    name = 'e1597933167585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "test" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "test22" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test22"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "test" integer NOT NULL`);
    }

}
