import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { Doctor } from './entities/doctor.entity';
import { Patient } from './entities/patient.entity';

function getTypeOrmConfig() {
  const isRender = process.env.RENDER === 'true' || !!process.env.RENDER;
  const isProd = process.env.NODE_ENV === 'production' || isRender;

  if (process.env.DATABASE_URL) {
    return {
      type: 'postgres' as const,
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: isProd ? { rejectUnauthorized: false } : false,
    };
  }

  return {
    type: 'postgres' as const,
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '123456789',
    database: process.env.DB_NAME ?? 'schedula_db',
    autoLoadEntities: true,
    synchronize: true,
    ssl: isProd ? { rejectUnauthorized: false } : false,
  };
}

@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    TypeOrmModule.forFeature([User, Doctor, Patient]),
    DoctorModule,
    PatientModule,
    AuthModule,
  ],
  controllers: [AppController, HelloController],
  providers: [AppService],
})
export class AppModule {}
