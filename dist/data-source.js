"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/entities/user.entity");
const doctor_entity_1 = require("./src/entities/doctor.entity");
const patient_entity_1 = require("./src/entities/patient.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'aryan512',
    database: 'internship_db',
    entities: [user_entity_1.User, doctor_entity_1.Doctor, patient_entity_1.Patient],
    migrations: ['./src/migrations/*.ts'],
});
//# sourceMappingURL=data-source.js.map