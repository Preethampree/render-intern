import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { Otp } from '../entities/otp.entity';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { ConfirmOtpDto } from './dto/confirm-otp.dto';
export declare class PatientService {
    private readonly patientRepo;
    private readonly otpRepo;
    constructor(patientRepo: Repository<Patient>, otpRepo: Repository<Otp>);
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
