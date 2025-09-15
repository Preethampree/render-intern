import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';

export interface ListDoctorsFilters {
  specialization?: string;
  location?: string;
  experience?: number;
  maxFee?: number;
}

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async listDoctors(filters: ListDoctorsFilters) {
    const qb = this.doctorRepo
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.user', 'user');

    if (filters.specialization) {
      qb.andWhere('LOWER(doctor.specialization) = LOWER(:specialization)', {
        specialization: filters.specialization,
      });
    }

    if (filters.location) {
      qb.andWhere('LOWER(doctor.location) = LOWER(:location)', {
        location: filters.location,
      });
    }

    if (typeof filters.experience === 'number') {
      qb.andWhere('doctor.experienceYears >= :experience', {
        experience: filters.experience,
      });
    }

    if (typeof filters.maxFee === 'number') {
      qb.andWhere('doctor.consultationFee <= :maxFee', { maxFee: filters.maxFee });
    }

    qb.orderBy('doctor.experienceYears', 'DESC');

    return qb.getMany();
  }
}


