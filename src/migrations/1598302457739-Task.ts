import {MigrationInterface, QueryRunner} from "typeorm";

export class Task1598302457739 implements MigrationInterface {
    name = 'Task1598302457739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "update" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ADD "updateDate" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "updateDate"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "update"`);
    }

}
