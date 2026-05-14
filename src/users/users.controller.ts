/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Request,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard) // todos los endpoints de este controlador requieren JWT
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('me')
  async getMe(@Request() req) {
    const user = await this.usersService.findById(req.user.id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      roles: user.roles,
    };
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id/roles')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async assignRoles(
    @Param('id') id: string,
    @Body() assignRolesDto: AssignRolesDto,
  ) {
    await this.usersService.assignRoles(id, assignRolesDto.roles);
    return { message: 'Roles asignados' };
  }
}
