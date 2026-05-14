/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Param,
  Patch,
} from '@nestjs/common';
import { CitaService } from './cita.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('cita')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CitaController {
  constructor(private readonly citaService: CitaService) {}

  @Post('crear-cita')
  @Roles('admin', 'paciente')
  create(@Body() createCitaDto: CreateCitaDto) {
    return this.citaService.create(createCitaDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.citaService.findAll();
  }

  @Get('doctor/mis-citas')
  @Roles('doctor')
  findMyCitas(@Request() req: any) {
    return this.citaService.findByDoctor(req.user.id as string);
  }

  @Get('doctor/cita/:id')
  @Roles('doctor')
  findOneForDoctor(@Param('id') id: string, @Request() req: any) {
    return this.citaService.findOneByDoctor(id, req.user.id as string);
  }

  @Get('admin/usuario/:id_user')
  @Roles('admin')
  findByUser(@Param('id_user') id_user: string) {
    return this.citaService.findByUser(id_user);
  }

  @Patch('admin/cancelar/:id')
  @Roles('admin')
  cancel(@Param('id') id: string) {
    return this.citaService.cancel(id);
  }
}
