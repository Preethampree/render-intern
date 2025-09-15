"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const patient_entity_1 = require("../entities/patient.entity");
const otp_entity_1 = require("../entities/otp.entity");
const bcrypt = __importStar(require("bcrypt"));
let PatientService = class PatientService {
    patientRepo;
    otpRepo;
    constructor(patientRepo, otpRepo) {
        this.patientRepo = patientRepo;
        this.otpRepo = otpRepo;
    }
    async register(dto) {
        const existingEmail = await this.patientRepo.findOne({ where: { email: dto.email } });
        if (existingEmail) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const existingPhone = await this.patientRepo.findOne({ where: { phone: dto.phone } });
        if (existingPhone) {
            throw new common_1.BadRequestException('Phone already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const patient = this.patientRepo.create({
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            password: hashedPassword,
        });
        const saved = await this.patientRepo.save(patient);
        return { id: saved.id, message: 'Registration successful' };
    }
    async requestOtp(dto) {
        const patient = await this.patientRepo.findOne({ where: { id: Number(dto.patientId) } });
        if (!patient)
            throw new common_1.BadRequestException('Patient not found');
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        const otp = this.otpRepo.create({
            code,
            email: dto.email,
            phone: dto.phone,
            patient,
            expiresAt,
        });
        await this.otpRepo.save(otp);
        console.log('OTP for verification:', code);
        return { message: 'OTP generated' };
    }
    async confirmOtp(dto) {
        const patient = await this.patientRepo.findOne({ where: { id: Number(dto.patientId) } });
        if (!patient)
            throw new common_1.BadRequestException('Patient not found');
        const otp = await this.otpRepo.findOne({
            where: {
                code: dto.code,
                email: dto.email,
                phone: dto.phone,
                patient: { id: patient.id },
                isVerified: false,
            },
            relations: ['patient'],
            order: { id: 'DESC' },
        });
        if (!otp)
            throw new common_1.BadRequestException('Invalid OTP');
        if (otp.expiresAt.getTime() < Date.now()) {
            throw new common_1.BadRequestException('OTP expired');
        }
        otp.isVerified = true;
        await this.otpRepo.save(otp);
        return { message: 'Verification successful' };
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __param(1, (0, typeorm_1.InjectRepository)(otp_entity_1.Otp)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PatientService);
//# sourceMappingURL=patient.service.js.map