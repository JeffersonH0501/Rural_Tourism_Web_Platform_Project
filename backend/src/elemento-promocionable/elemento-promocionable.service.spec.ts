import { Test, TestingModule } from '@nestjs/testing';
import { ElementoPromocionableService } from './elemento-promocionable.service';

describe('ElementoPromocionableService', () => {
  let service: ElementoPromocionableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElementoPromocionableService],
    }).compile();

    service = module.get<ElementoPromocionableService>(ElementoPromocionableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
