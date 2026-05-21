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
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CitaService } from './cita.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('citas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CitaController {
  constructor(private readonly citaService: CitaService) {}

  @Post()
  @Roles('patient')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCitaDto: CreateCitaDto, @Request() req: any) {
    const id_user = req.user.id as string;
    return this.citaService.create(createCitaDto, id_user);
  }

  @Get()
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.citaService.findAll();
  }

  @Get('mis-citas')
  @Roles('patient', 'doctor')
  @HttpCode(HttpStatus.OK)
  findMyCitas(@Request() req: any) {
    const userId = req.user.id as string;
    const roles = req.user.roles as string[];
    if (roles.includes('doctor')) {
      return this.citaService.findByDoctor(userId);
    }
    return this.citaService.findByUser(userId);
  }

  @Patch(':id/status')
  @Roles('doctor')
  @HttpCode(HttpStatus.OK)
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
    @Request() req: any,
  ) {
    const id_doctor = req.user.id as string;
    return this.citaService.updateStatus(id, updateStatusDto, id_doctor);
  }

  @Delete(':id')
  @Roles('patient')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.citaService.remove(id);
  }
}
