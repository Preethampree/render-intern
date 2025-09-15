import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateInitialTables1757327054772 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
