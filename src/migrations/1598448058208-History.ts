import {MigrationInterface, QueryRunner} from "typeorm";

export class History1598448058208 implements MigrationInterface {
    name = 'History1598448058208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_history" ("id" SERIAL NOT NULL, "taskId" integer NOT NULL, CONSTRAINT "PK_716670443aea4a2f4a599bb7c53" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task_history"`);
    }

}
