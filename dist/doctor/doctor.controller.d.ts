import { DoctorService } from './doctor.service';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    list(specialization?: string, location?: string, experience?: string, maxFee?: string): Promise<import("../entities/doctor.entity").Doctor[]>;
    getAvailableSlots(id: string, date: string): Promise<{
        doctorId: number;
        date: string;
        slots: import("./scheduling").AvailableSlot[];
    }>;
}
