import { BadRequestException, Injectable } from '@nestjs/common';
import { ArtesaniasEntity } from './artesanias.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtesaniasDto } from './artesanias.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class ArtesaniasService {
    constructor(
        @InjectRepository(ArtesaniasEntity)
        private readonly artesaniasRepository: Repository<ArtesaniasEntity>,
    ) {}

    async createArtesania(ArtesaniasDTO: ArtesaniasDto): Promise<ArtesaniasEntity> {

      if (!ArtesaniasDTO.Nombre || ArtesaniasDTO.Nombre.trim() === ""){
        throw new BadRequestException("La artesanía debe tener un nombre")
      }

        const newArtesania = this.artesaniasRepository.create(ArtesaniasDTO);
        return await this.artesaniasRepository.save(newArtesania);
      }
    
      async findAllArtesanias(): Promise<ArtesaniasEntity[]> {
        return await this.artesaniasRepository.find({relations: ["usuario"]});
      }

      async findArtesaniaById(id: number): Promise<ArtesaniasEntity | undefined> {
        return await this.artesaniasRepository.findOne({ where: { id: id }, relations: ['usuario'] });
      }

      async updateArtesania(id: number, artesaniasDTO: ArtesaniasDto): Promise<ArtesaniasEntity> {
        const artesania = await this.artesaniasRepository.findOne({ where: { id: id }, relations: ['usuario'] });
        if (!artesania) {
            throw new BadRequestException('Artesania con el id dado no encontrada');
        }
        const updated = this.artesaniasRepository.merge(artesania, artesaniasDTO);
        return this.artesaniasRepository.save(updated);
    }

      async deleteArtesaniaById(id: number): Promise<String> {
        const artesania = await this.artesaniasRepository.findOne({ where: { id: id }, relations: ['usuario'] });
        if (!artesania) {
            throw new BadRequestException('Artesania con el id dado no encontrada');
        }
        await this.artesaniasRepository.delete(id);
        return "Artesania " + id + " eliminada"

      }



      async onModuleInit() {
        await this.seedArtesanias();
    }

    private async seedArtesanias() {
      for (let i = 0; i<10; i++){


      const artesania = await this.artesaniasRepository.save({
        Nombre: faker.commerce.productName(),
        Precio: Number(faker.commerce.price()),
        Cantidad: Number(faker.commerce.price()),
        Material: faker.string.alphanumeric(),
        Disponibilidad: Math.random() < 0.5,
        Origen: faker.string.alphanumeric(),
        Descripcion: faker.commerce.productDescription(),
        Imagen: faker.image.url()
      });

        await this.artesaniasRepository.save(artesania);
    }
  }

    


}
