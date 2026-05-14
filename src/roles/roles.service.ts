import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existing = await this.roleRepository.findOne({
      where: { role_name: createRoleDto.role_name },
    });

    if (existing) {
      throw new ConflictException('role_name ya existe');
    }

    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    try {
      return await this.roleRepository.find();
    } catch {
      throw new InternalServerErrorException('Error al obtener roles');
    }
  }

  async findByNames(names: string[]): Promise<Role[]> {
    return this.roleRepository.find({
      where: { role_name: In(names) },
    });
  }
}
