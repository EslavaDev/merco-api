import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrations1574194618292 implements MigrationInterface {
    name = 'Migrations1574194618292'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" integer NOT NULL DEFAULT 1`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`, undefined);
    }

}
