import { BadRequestException } from '@nestjs/common';

export type SchedulingModel = 'wave' | 'stream';

export interface WaveSlotDefinition {
	start: string; // HH:mm
	end: string;   // HH:mm
	durationMinutes: number;
	capacity: number;
}

export interface StreamBlockDefinition {
	start: string; // HH:mm
	end: string;   // HH:mm
}

export interface DoctorSchedulingConfig {
	model: SchedulingModel;
	waveSlots?: WaveSlotDefinition[];
	streamBlock?: StreamBlockDefinition;
}

export interface AvailableSlot {
	start: string; // ISO datetime
	end: string;   // ISO datetime
	capacity?: number; // for wave
}

// Temporary in-memory scheduling configuration per doctorId
export const doctorSchedulingConfig: Record<number, DoctorSchedulingConfig> = {
	// Example configs; in real use, move to DB in a migration (PR-3)
	1: {
		model: 'wave',
		waveSlots: [
			{ start: '09:00', end: '10:00', durationMinutes: 15, capacity: 2 },
			{ start: '10:00', end: '11:00', durationMinutes: 15, capacity: 2 },
			{ start: '15:00', end: '16:00', durationMinutes: 20, capacity: 3 },
		],
	},
	2: {
		model: 'stream',
		streamBlock: { start: '11:00', end: '14:00' },
	},
};

export function computeAvailableSlots(
	doctorId: number,
	isoDate: string,
): AvailableSlot[] {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
		throw new BadRequestException('Invalid date format. Use YYYY-MM-DD');
	}
	const config = doctorSchedulingConfig[doctorId];
	if (!config) return [];
	if (config.model === 'stream') {
		if (!config.streamBlock) return [];
		const { start, end } = config.streamBlock;
		return [
			{
				start: toIso(isoDate, start),
				end: toIso(isoDate, end),
			},
		];
	}
	if (config.model === 'wave') {
		const out: AvailableSlot[] = [];
		for (const def of config.waveSlots ?? []) {
			// For wave scheduling, each wave slot is reported as a block with remaining capacity
			out.push({
				start: toIso(isoDate, def.start),
				end: toIso(isoDate, def.end),
				capacity: def.capacity,
			});
		}
		return out;
	}
	return [];
}

function toIso(date: string, hhmm: string): string {
	const [h, m] = hhmm.split(':').map(Number);
	const d = new Date(date + 'T00:00:00.000Z');
	// Construct in local time-agnostic way by using UTC setters
	d.setUTCHours(h, m, 0, 0);
	return d.toISOString();
}


