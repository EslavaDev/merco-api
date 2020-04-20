import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrations1574299273840 implements MigrationInterface {
    name = 'Migrations1574299273840'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "markets" ADD "code" json NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "markets" DROP COLUMN "code"`, undefined);
    }

}
