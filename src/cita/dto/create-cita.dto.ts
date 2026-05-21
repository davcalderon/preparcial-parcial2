/* eslint-disable prettier/prettier */
import { IsUUID, IsDateString, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCitaDto {
  @IsUUID('4', { message: 'id_doctor debe ser un uuid' })
  @IsNotEmpty({ message: 'id_doctor es requerido' })
  id_doctor!: string;

  @IsDateString({}, { message: 'datetime debe ser una fecha' })
  @IsNotEmpty({ message: 'datetime es requerido' })
  datetime!: string;

  @IsString({ message: 'reason debe ser texto' })
  @IsNotEmpty({ message: 'reason requerido' })
  @MinLength(5,)
  reason!: string;
}
