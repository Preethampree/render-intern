import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';
import { DoctorModule } from './doctor/doctor.module';
import { User } from './entities/user.entity';
import { Doctor } from './entities/doctor.entity';
import { Patient } from './entities/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'schedula_db',
      entities: [User, Doctor, Patient],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Doctor, Patient]),
    DoctorModule,
  ],
  controllers: [AppController, HelloController],
  providers: [AppService],
})
export class AppModule {}
