import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/user.entity';
import {
  AgriculturalProduct,
  Craft,
  Farm,
  Promotion,
  Tour,
} from './catalog.entities';
export type Kind =
  'agriculturalProducts' | 'crafts' | 'farms' | 'tours' | 'promotions';
type Actor = { id: number; role: UserRole };
@Injectable()
export class CatalogService {
  private repos: Record<Kind, Repository<any>>;
  constructor(
    @InjectRepository(AgriculturalProduct)
    products: Repository<AgriculturalProduct>,
    @InjectRepository(Craft) crafts: Repository<Craft>,
    @InjectRepository(Farm) farms: Repository<Farm>,
    @InjectRepository(Tour) tours: Repository<Tour>,
    @InjectRepository(Promotion) promotions: Repository<Promotion>,
    @InjectRepository(User) private users: Repository<User>,
  ) {
    this.repos = {
      agriculturalProducts: products,
      crafts,
      farms,
      tours,
      promotions,
    };
  }
  list(kind: Kind) {
    return this.repos[kind].find({
      relations: { owner: true },
      select: { owner: { id: true, firstName: true, lastName: true } },
    });
  }
  async one(kind: Kind, id: number) {
    const item = await this.repos[kind].findOne({
      where: { id },
      relations: { owner: true },
    });
    if (!item) throw new NotFoundException('Resource not found');
    return item;
  }
  private allowed(kind: Kind, actor: Actor) {
    if (actor.role === UserRole.ADMIN) return;
    const accepted: Record<Kind, UserRole[]> = {
      agriculturalProducts: [UserRole.FARMER],
      crafts: [UserRole.ARTISAN],
      farms: [UserRole.FARMER],
      tours: [UserRole.FARMER],
      promotions: [UserRole.FARMER, UserRole.ARTISAN],
    };
    if (!accepted[kind].includes(actor.role))
      throw new ForbiddenException('Your role cannot manage this resource');
  }
  async create(kind: Kind, input: any, actor: Actor) {
    this.allowed(kind, actor);
    const owner = await this.users.findOneByOrFail({ id: actor.id });
    const data = { ...input, owner };
    if (kind === 'tours' && input.farmId) {
      const farm = await this.repos.farms.findOne({
        where: { id: input.farmId },
        relations: { owner: true },
      });
      if (!farm || farm.owner.id !== actor.id)
        throw new BadRequestException('Farm is invalid or is not owned by you');
      data.farm = farm;
      delete data.farmId;
    }
    return this.repos[kind].save(this.repos[kind].create(data));
  }
  async update(kind: Kind, id: number, input: any, actor: Actor) {
    this.allowed(kind, actor);
    const item = await this.one(kind, id);
    if (actor.role !== UserRole.ADMIN && item.owner.id !== actor.id)
      throw new ForbiddenException('You do not own this resource');
    if (
      kind === 'tours' &&
      Object.prototype.hasOwnProperty.call(input, 'farmId')
    ) {
      if (input.farmId) {
        const farm = await this.repos.farms.findOne({
          where: { id: input.farmId },
          relations: { owner: true },
        });
        if (
          !farm ||
          (actor.role !== UserRole.ADMIN && farm.owner.id !== actor.id)
        )
          throw new BadRequestException(
            'Farm is invalid or is not owned by you',
          );
        item.farm = farm;
      } else {
        item.farm = null;
      }
      delete input.farmId;
    }
    Object.assign(item, input);
    return this.repos[kind].save(item);
  }
  async remove(kind: Kind, id: number, actor: Actor) {
    this.allowed(kind, actor);
    const item = await this.one(kind, id);
    if (actor.role !== UserRole.ADMIN && item.owner.id !== actor.id)
      throw new ForbiddenException('You do not own this resource');
    await this.repos[kind].remove(item);
    return { message: 'Resource deleted successfully' };
  }
}
