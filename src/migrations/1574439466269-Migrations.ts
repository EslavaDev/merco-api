import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrations1574439466269 implements MigrationInterface {
    name = 'Migrations1574439466269'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_e622491ca77016209bd7219b262"`, undefined);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "sku" character varying NOT NULL, "price" character varying NOT NULL, "unit_type" character varying NOT NULL, "image" character varying NOT NULL, "discount_price" character varying NOT NULL, "discount_show" boolean NOT NULL DEFAULT false, "variants" character varying array NOT NULL, "marketId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "userId"`, undefined);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_3c8b0152d1e46637a65ddaaa37c" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_3c8b0152d1e46637a65ddaaa37c"`, undefined);
        await queryRunner.query(`ALTER TABLE "publications" ADD "userId" integer`, undefined);
        await queryRunner.query(`DROP TABLE "products"`, undefined);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_e622491ca77016209bd7219b262" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
