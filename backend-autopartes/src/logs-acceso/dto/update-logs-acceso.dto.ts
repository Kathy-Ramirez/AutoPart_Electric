import { PartialType } from '@nestjs/mapped-types';
import { CreateLogsAccesoDto } from './create-logs-acceso.dto';

export class UpdateLogsAccesoDto extends PartialType(CreateLogsAccesoDto) {}
