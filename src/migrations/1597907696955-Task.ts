import {MigrationInterface, QueryRunner} from "typeorm";

export class Task1597907696955 implements MigrationInterface {
    name = 'Task1597907696955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "test1" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "test" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test1"`);
    }

}
