import { Controller, Get, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('api/v1/doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  async list(
    @Query('specialization') specialization?: string,
    @Query('location') location?: string,
    @Query('experience') experience?: string,
    @Query('maxFee') maxFee?: string,
  ) {
    const filters = {
      specialization,
      location,
      experience: experience !== undefined ? Number(experience) : undefined,
      maxFee: maxFee !== undefined ? Number(maxFee) : undefined,
    };
    return this.doctorService.listDoctors(filters);
  }
}


