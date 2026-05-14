import { IsUUID, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateCitaDto {
  @IsUUID()
  @IsNotEmpty()
  id_user!: string;

  @IsUUID()
  @IsNotEmpty()
  id_doctor!: string;

  @IsDateString()
  @IsNotEmpty()
  date!: string;
}
