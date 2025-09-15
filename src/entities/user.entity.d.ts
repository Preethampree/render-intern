import { Doctor } from './doctor.entity';
import { Patient } from './patient.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'doctor' | 'patient';
    provider: string;
    doctor: Doctor;
    patient: Patient;
}
