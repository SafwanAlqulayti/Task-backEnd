import {MigrationInterface, QueryRunner} from "typeorm";

export class Task1597932597210 implements MigrationInterface {
    name = 'Task1597932597210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "test" TO "teswt"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test1"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "test" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "test1" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "teswt" TO "test"`);
    }

}
