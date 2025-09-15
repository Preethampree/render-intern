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
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const patient_service_1 = require("./patient.service");
const register_patient_dto_1 = require("./dto/register-patient.dto");
const request_otp_dto_1 = require("./dto/request-otp.dto");
const confirm_otp_dto_1 = require("./dto/confirm-otp.dto");
let PatientController = class PatientController {
    patientService;
    constructor(patientService) {
        this.patientService = patientService;
    }
    register(dto) {
        return this.patientService.register(dto);
    }
    requestOtp(dto) {
        return this.patientService.requestOtp(dto);
    }
    confirmOtp(dto) {
        return this.patientService.confirmOtp(dto);
    }
};
exports.PatientController = PatientController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_patient_dto_1.RegisterPatientDto]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('verify/request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_otp_dto_1.RequestOtpDto]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "requestOtp", null);
__decorate([
    (0, common_1.Post)('verify/confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_otp_dto_1.ConfirmOtpDto]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "confirmOtp", null);
exports.PatientController = PatientController = __decorate([
    (0, common_1.Controller)('api/v1'),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientController);
//# sourceMappingURL=patient.controller.js.map