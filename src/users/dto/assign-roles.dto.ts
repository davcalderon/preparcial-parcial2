/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class AssignRolesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  roles!: string[];
}
