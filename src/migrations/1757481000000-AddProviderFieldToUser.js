"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProviderFieldToUser1757481000000 = void 0;
class AddProviderFieldToUser1757481000000 {
    name = 'AddProviderFieldToUser1757481000000';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "provider" character varying NOT NULL DEFAULT 'google'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider"`);
    }
}
exports.AddProviderFieldToUser1757481000000 = AddProviderFieldToUser1757481000000;
//# sourceMappingURL=1757481000000-AddProviderFieldToUser.js.map