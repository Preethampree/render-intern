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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const doctor_service_1 = require("./doctor.service");
let DoctorController = class DoctorController {
    doctorService;
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    async list(specialization, location, experience, maxFee) {
        const filters = {
            specialization,
            location,
            experience: experience !== undefined ? Number(experience) : undefined,
            maxFee: maxFee !== undefined ? Number(maxFee) : undefined,
        };
        return this.doctorService.listDoctors(filters);
    }
    async getAvailableSlots(id, date) {
        return this.doctorService.getAvailableSlots(Number(id), date);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('specialization')),
    __param(1, (0, common_1.Query)('location')),
    __param(2, (0, common_1.Query)('experience')),
    __param(3, (0, common_1.Query)('maxFee')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id/available-slots'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getAvailableSlots", null);
exports.DoctorController = DoctorController = __decorate([
    (0, common_1.Controller)('api/v1/doctors'),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map