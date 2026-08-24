import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Finca } from './fincas.entity';
import { CreateFincasDto } from './fincas.dto';
import { UpdateFincasDto } from './fincasU.dto';

@Injectable()
export class FincaService {
  constructor(
    @InjectRepository(Finca)
    private fincaRepository: Repository<Finca>,
  ) {}

  findAll(): Promise<Finca[]> {
    return this.fincaRepository.find({relations: ['tour']});
  }

  findOne(id: number): Promise<Finca> {
    return this.fincaRepository.findOne({ where: {id:id }, relations: ['tour']});
  }

  create(createFincaDto: CreateFincasDto): Promise<Finca> {
    const finca = this.fincaRepository.create(createFincaDto);
    return this.fincaRepository.save(finca);
  }

  async update(id: number, updateFincaDto: UpdateFincasDto): Promise<Finca> {
    await this.fincaRepository.update(id, updateFincaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.fincaRepository.delete(id);
  }
}
