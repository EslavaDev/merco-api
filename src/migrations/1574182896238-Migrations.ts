import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrations1574182896238 implements MigrationInterface {
    name = 'Migrations1574182896238'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "photo" character varying NOT NULL DEFAULT 'none', "uuid" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_951b8f1dfc94ac1d0301a14b7e1" UNIQUE ("uuid"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "publications" ("id" SERIAL NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "type" character varying NOT NULL, "sex" character varying NOT NULL, "age" character varying NOT NULL, "photo" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_2c4e732b044e09139d2f1065fae" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_e622491ca77016209bd7219b262" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_e622491ca77016209bd7219b262"`, undefined);
        await queryRunner.query(`DROP TABLE "publications"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
