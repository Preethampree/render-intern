import { PatientService } from './patient.service';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { ConfirmOtpDto } from './dto/confirm-otp.dto';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    register(dto: RegisterPatientDto): Promise<{
        id: number;
        message: string;
    }>;
    requestOtp(dto: RequestOtpDto): Promise<{
        message: string;
    }>;
    confirmOtp(dto: ConfirmOtpDto): Promise<{
        message: string;
    }>;
}
