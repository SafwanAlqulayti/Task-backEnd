import {MigrationInterface, QueryRunner} from "typeorm";

export class Task1598131088602 implements MigrationInterface {
    name = 'Task1598131088602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test22"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "test22" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "test" integer NOT NULL`);
    }

}
