"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitSchema1757480438251 = void 0;
class InitSchema1757480438251 {
    name = 'InitSchema1757480438251';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "doctor" ("id" SERIAL NOT NULL, "specialization" character varying NOT NULL, "user_id" integer, CONSTRAINT "REL_a685e79dc974f768c39e5d1228" UNIQUE ("user_id"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('doctor', 'patient')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "age" integer NOT NULL, "medicalHistory" character varying NOT NULL, "user_id" integer, CONSTRAINT "REL_f20f0bf6b734938c710e12c278" UNIQUE ("user_id"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD CONSTRAINT "FK_a685e79dc974f768c39e5d12281" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_f20f0bf6b734938c710e12c2782" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_f20f0bf6b734938c710e12c2782"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP CONSTRAINT "FK_a685e79dc974f768c39e5d12281"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "doctor"`);
    }
}
exports.InitSchema1757480438251 = InitSchema1757480438251;
//# sourceMappingURL=1757480438251-InitSchema.js.map