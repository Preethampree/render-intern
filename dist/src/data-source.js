"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456789",
    database: "schedula_db",
    synchronize: false,
    logging: true,
    entities: ["src/entities/**/*.ts"],
    migrations: ["dist/migrations/*.js"],
});
//# sourceMappingURL=data-source.js.map