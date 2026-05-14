import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) {}

  async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    const nuevaCita = this.citaRepository.create(createCitaDto);
    return await this.citaRepository.save(nuevaCita);
  }

  async findAll(): Promise<Cita[]> {
    return await this.citaRepository.find({ relations: ['user', 'doctor'] });
  }

  async findByDoctor(id_doctor: string): Promise<Cita[]> {
    return await this.citaRepository.find({
      where: { id_doctor },
      relations: ['user'],
    });
  }

  async findOneByDoctor(id: string, id_doctor: string): Promise<Cita> {
    const cita = await this.citaRepository.findOne({
      where: { id, id_doctor },
      relations: ['user'],
    });
    if (!cita) throw new NotFoundException('La cita no pudo ser programada');
    return cita;
  }

  async findByUser(id_user: string): Promise<Cita[]> {
    return await this.citaRepository.find({
      where: { id_user },
      relations: ['doctor'],
    });
  }

  async cancel(id: string): Promise<Cita> {
    const cita = await this.citaRepository.findOne({ where: { id } });
    if (!cita) throw new NotFoundException('Cita no encontrada');
    cita.status = 'cancelada';
    return await this.citaRepository.save(cita);
  }
}
