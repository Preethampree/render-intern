"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorSchedulingConfig = void 0;
exports.computeAvailableSlots = computeAvailableSlots;
const common_1 = require("@nestjs/common");
exports.doctorSchedulingConfig = {
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
function computeAvailableSlots(doctorId, isoDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
        throw new common_1.BadRequestException('Invalid date format. Use YYYY-MM-DD');
    }
    const config = exports.doctorSchedulingConfig[doctorId];
    if (!config)
        return [];
    if (config.model === 'stream') {
        if (!config.streamBlock)
            return [];
        const { start, end } = config.streamBlock;
        return [
            {
                start: toIso(isoDate, start),
                end: toIso(isoDate, end),
            },
        ];
    }
    if (config.model === 'wave') {
        const out = [];
        for (const def of config.waveSlots ?? []) {
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
function toIso(date, hhmm) {
    const [h, m] = hhmm.split(':').map(Number);
    const d = new Date(date + 'T00:00:00.000Z');
    d.setUTCHours(h, m, 0, 0);
    return d.toISOString();
}
//# sourceMappingURL=scheduling.js.map