import {MigrationInterface, QueryRunner} from "typeorm";

export class Task1597932776544 implements MigrationInterface {
    name = 'Task1597932776544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "test" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test"`);
    }

}
