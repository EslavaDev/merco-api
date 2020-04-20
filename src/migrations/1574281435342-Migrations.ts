import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrations1574281435342 implements MigrationInterface {
    name = 'Migrations1574281435342'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "markets" ("id" SERIAL NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "banners" character varying array NOT NULL, "description" character varying NOT NULL, "photo" character varying NOT NULL DEFAULT 'none', CONSTRAINT "PK_dda44129b32f21ae9f1c28dcf99" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "marketId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_4aa54df93a5fef75e3503d62254" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_4aa54df93a5fef75e3503d62254"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "marketId"`, undefined);
        await queryRunner.query(`DROP TABLE "markets"`, undefined);
    }

}
