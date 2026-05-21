import { IsEnum, IsNotEmpty } from 'class-validator';
import { CitaStatus } from '../cita.entity';

export class UpdateStatusDto {
  @IsEnum([CitaStatus.cancelled, CitaStatus.done], {
    message: 'El estado debe ser cancelled o done',
  })
  @IsNotEmpty({ message: 'status es requerido' })
  status!: CitaStatus.cancelled | CitaStatus.done;
}
