import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Finca } from './fincas.entity';
import { FincaService } from './fincas.service';
import { Repository } from 'typeorm';

describe('FincaService', () => {
  let service: FincaService;
  let repository: Repository<Finca>;
  let fincasList: Finca[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FincaService,
        {
          provide: getRepositoryToken(Finca),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FincaService>(FincaService);
    repository = module.get<Repository<Finca>>(getRepositoryToken(Finca));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
