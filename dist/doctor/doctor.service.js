"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_entity_1 = require("../entities/doctor.entity");
const scheduling_1 = require("./scheduling");
let DoctorService = class DoctorService {
    doctorRepo;
    constructor(doctorRepo) {
        this.doctorRepo = doctorRepo;
    }
    async listDoctors(filters) {
        const qb = this.doctorRepo
            .createQueryBuilder('doctor')
            .leftJoinAndSelect('doctor.user', 'user');
        if (filters.specialization) {
            qb.andWhere('LOWER(doctor.specialization) = LOWER(:specialization)', {
                specialization: filters.specialization,
            });
        }
        if (filters.location) {
            qb.andWhere('LOWER(doctor.location) = LOWER(:location)', {
                location: filters.location,
            });
        }
        if (typeof filters.experience === 'number') {
            qb.andWhere('doctor.experienceYears >= :experience', {
                experience: filters.experience,
            });
        }
        if (typeof filters.maxFee === 'number') {
            qb.andWhere('doctor.consultationFee <= :maxFee', { maxFee: filters.maxFee });
        }
        qb.orderBy('doctor.experienceYears', 'DESC');
        return qb.getMany();
    }
    async getAvailableSlots(doctorId, date) {
        if (!Number.isFinite(doctorId)) {
            throw new common_1.BadRequestException('Invalid doctor id');
        }
        const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor not found');
        }
        const slots = (0, scheduling_1.computeAvailableSlots)(doctorId, date);
        return { doctorId, date, slots };
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map