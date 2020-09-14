import {MigrationInterface, QueryRunner} from "typeorm";

export class test1599470703842 implements MigrationInterface {
    name = 'test1599470703842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "teswt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "teswt" character varying`);
    }

}
