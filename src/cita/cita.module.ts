import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaService } from './cita.service';
import { CitaController } from './cita.controller';
import { Cita } from './cita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cita])],
  providers: [CitaService],
  controllers: [CitaController],
})
export class CitaModule {}
