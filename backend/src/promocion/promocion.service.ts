import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promocion } from './promocion.entity';
import { ElementoPromocionable } from '../elemento-promocionable/elemento-promocionable.entity';

@Injectable()
export class PromocionService {
  constructor(
    @InjectRepository(Promocion)
    private promocionRepository: Repository<Promocion>,
    @InjectRepository(ElementoPromocionable)
    private elementoPromocionableRepository: Repository<ElementoPromocionable>,
  ) {}

  findAll(): Promise<Promocion[]> {
    return this.promocionRepository.find({ relations: ['elementoPromocionable'] });
  }

  findOne(id: string): Promise<Promocion> {
    const numericId = parseInt(id, 10);  
    return this.promocionRepository.findOne({ where: { id: numericId }, relations: ['elementoPromocionable'] });
  }

  async remove(id: string): Promise<void> {
    const numericId = parseInt(id, 10);  
    await this.promocionRepository.delete(numericId);
  }

  create(promocion: Promocion): Promise<Promocion> {
    return this.promocionRepository.save(promocion);
  }
}
