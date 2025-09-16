import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';
export interface ListDoctorsFilters {
    specialization?: string;
    location?: string;
    experience?: number;
    maxFee?: number;
}
export declare class DoctorService {
    private readonly doctorRepo;
    constructor(doctorRepo: Repository<Doctor>);
    listDoctors(filters: ListDoctorsFilters): Promise<Doctor[]>;
    getAvailableSlots(doctorId: number, date: string): Promise<{
        doctorId: number;
        date: string;
        slots: import("./scheduling").AvailableSlot[];
    }>;
}
