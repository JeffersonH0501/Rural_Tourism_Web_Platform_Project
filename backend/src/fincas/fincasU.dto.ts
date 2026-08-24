import { PartialType } from '@nestjs/mapped-types';
import { CreateFincasDto } from './fincas.dto';

export class UpdateFincasDto extends PartialType(CreateFincasDto) {}
