import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrations1574441023521 implements MigrationInterface {
    name = 'Migrations1574441023521'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "price" character varying NOT NULL, "status_dispatch" character varying NOT NULL, "status_payment" character varying NOT NULL, "address" character varying NOT NULL, "payment_method" character varying NOT NULL, "marketId" integer, "userId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_7b92178727cd566805ae220ffd6" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`, undefined);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_7b92178727cd566805ae220ffd6"`, undefined);
        await queryRunner.query(`DROP TABLE "orders"`, undefined);
    }

}
