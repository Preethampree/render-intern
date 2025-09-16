export type SchedulingModel = 'wave' | 'stream';
export interface WaveSlotDefinition {
    start: string;
    end: string;
    durationMinutes: number;
    capacity: number;
}
export interface StreamBlockDefinition {
    start: string;
    end: string;
}
export interface DoctorSchedulingConfig {
    model: SchedulingModel;
    waveSlots?: WaveSlotDefinition[];
    streamBlock?: StreamBlockDefinition;
}
export interface AvailableSlot {
    start: string;
    end: string;
    capacity?: number;
}
export declare const doctorSchedulingConfig: Record<number, DoctorSchedulingConfig>;
export declare function computeAvailableSlots(doctorId: number, isoDate: string): AvailableSlot[];
