import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from '../entities/doctor.entity';
import { User } from '../entities/user.entity';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, User])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}


