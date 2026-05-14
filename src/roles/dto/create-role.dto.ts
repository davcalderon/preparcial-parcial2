/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty({ message: 'role_name es requerido' })
  role_name!: string;

  @IsString()
  @IsOptional()
  description?: string;
}
