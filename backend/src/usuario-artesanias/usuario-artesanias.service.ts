import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtesaniasEntity } from '../artesanias/artesanias.entity';
import { UsuarioEntity } from '../models/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioArtesaniasService {
    constructor(
        @InjectRepository(ArtesaniasEntity)
        private readonly artesaniaRepository: Repository<ArtesaniasEntity>,
    
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async addArtesaniaToUsuario(usuarioId: number, artesaniaId: number): Promise<UsuarioEntity> {
        const artesania: ArtesaniasEntity = await this.artesaniaRepository.findOne({ where: {id:artesaniaId } });
        if (!artesania)
          throw new BadRequestException("The artesania with the given id was not found");
        
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: {id:usuarioId }, relations: ['artesanias'] })
        if (!usuario) 
          throw new BadRequestException("The usuario with the given id was not found");
        
        usuario.artesanias = [...usuario.artesanias, artesania];
        return await this.usuarioRepository.save(usuario);
    }
    
    async findArtesaniaByUsuarioIdArtesaniaId(usuarioId: number, artesaniaId: number): Promise<ArtesaniasEntity> {
        const artesania: ArtesaniasEntity = await this.artesaniaRepository.findOne({where: {id: artesaniaId}, relations: ["usuario"]});
        if (!artesania)
            throw new BadRequestException("The artesania with the given id was not found");
       
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["artesanias"]});
        if (!usuario)
            throw new BadRequestException("The usuario with the given id was not found");
   
        const usuarioArtesania: ArtesaniasEntity = usuario.artesanias.find(e => e.id === artesania.id);
   
        if (!usuarioArtesania)
            throw new BadRequestException("The artesania with the given id was not asociated with the Usuario with the given id");
   
        return usuarioArtesania;
    }
    
    async findArtesaniasByUsuarioId(usuarioId: number): Promise<ArtesaniasEntity[]> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["artesanias"]});
        if (!usuario)
            throw new BadRequestException("The usuario with the given id was not found");
       
        return usuario.artesanias;
    }
    
    async associateArtesaniasUsuario(usuarioId: number, artesanias: ArtesaniasEntity[]): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["artesanias"]});
    
        if (!usuario)
            throw new BadRequestException("The usuario with the given id was not found");
    
        for (let i = 0; i < artesanias.length; i++) {
          const artesania: ArtesaniasEntity = await this.artesaniaRepository.findOne({where: {id: artesanias[i].id}, relations: ["usuario"]});
          if (!artesania)
            throw new BadRequestException("The artesania with the given id was not found");
        }
    
        usuario.artesanias = artesanias;
        return await this.usuarioRepository.save(usuario);
      }
    
    async deleteArtesaniaUsuario(usuarioId: number, artesaniaId: number){
        const artesania: ArtesaniasEntity = await this.artesaniaRepository.findOne({where: {id: artesaniaId}, relations: ["usuario"]});
        if (!artesania)
            throw new BadRequestException("The artesania with the given id was not found");
    
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["artesanias"]});
        if (!usuario)
            throw new BadRequestException("The usuario with the given id was not found");
    
        const usuarioArtesania: ArtesaniasEntity = usuario.artesanias.find(e => e.id === artesania.id);
    
        if (!usuarioArtesania)
            throw new BadRequestException("The artesania with the given id is not associated to the usuario")
 
        usuario.artesanias = usuario.artesanias.filter(e => e.id !== artesaniaId);
        await this.usuarioRepository.save(usuario);
    }
}