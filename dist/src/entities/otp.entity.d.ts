import { Patient } from './patient.entity';
export declare class Otp {
    id: number;
    code: string;
    email?: string;
    phone?: string;
    patient?: Patient;
    expiresAt: Date;
    isVerified: boolean;
    createdAt: Date;
}
