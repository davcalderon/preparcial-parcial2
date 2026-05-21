import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita, CitaStatus } from './cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) {}

  async create(createCitaDto: CreateCitaDto, id_user: string): Promise<Cita> {
    const nuevaCita = this.citaRepository.create({
      ...createCitaDto,
      id_user,
      status: CitaStatus.pending,
    });
    return await this.citaRepository.save(nuevaCita);
  }

  async findAll(): Promise<Cita[]> {
    return await this.citaRepository.find({
      relations: ['user', 'doctor'],
    });
  }

  async findByDoctor(id_doctor: string): Promise<Cita[]> {
    return await this.citaRepository.find({
      where: { id_doctor },
      relations: ['user'],
    });
  }

  async findByUser(id_user: string): Promise<Cita[]> {
    return await this.citaRepository.find({
      where: { id_user },
      relations: ['doctor'],
    });
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusDto,
    id_doctor: string,
  ): Promise<Cita> {
    const cita = await this.citaRepository.findOne({
      where: { id, id_doctor },
    });
    if (!cita) {
      throw new NotFoundException('cita no encontrada');
    }
    if (cita.id_doctor !== id_doctor)
      throw new ForbiddenException('no tiene permiso para modificar esta cita');

    cita.status = updateStatusDto.status;
    return await this.citaRepository.save(cita);
  }

  async remove(id: string): Promise<{ message: string }> {
    const cita = await this.citaRepository.findOne({
      where: { id },
    });
    if (!cita) {
      throw new NotFoundException('cita no encontrada');
    }
    await this.citaRepository.remove(cita);
    return { message: 'cita eliminada' };
  }
}
