import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Finca } from '../fincas/fincas.entity';
import { UsuarioEntity } from '../models/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioFincasService {
    constructor(
        @InjectRepository(Finca)
        private readonly fincaRepository: Repository<Finca>,
    
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async addFincaToUsuario(usuarioId: number, fincaId: number): Promise<UsuarioEntity> {
        const finca: Finca = await this.fincaRepository.findOne({ where: {id: fincaId } });
        if (!finca)
          throw new BadRequestException("The finca with the given id was not found");
        
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: {id: usuarioId }, relations: ['fincas'] })
        if (!usuario) 
          throw new BadRequestException("The usuario with the given id was not found");
        
        usuario.fincas = [...usuario.fincas, finca];
        return await this.usuarioRepository.save(usuario);
    }
    
    async findFincaByUsuarioIdFincaId(usuarioId: number, fincaId: number): Promise<Finca> {
        const finca: Finca = await this.fincaRepository.findOne({where: {id: fincaId}, relations: ["usuario"]});
        if (!finca)
            throw new BadRequestException("The finca with the given id was not found");
       
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["fincas"]});
        if (!usuario)
            throw new BadRequestException("The usuario with the given id was not found");
   
        const usuarioFinca: Finca = usuario.fincas.find(e => e.id === finca.id);
   
        if (!usuarioFinca)
            throw new BadRequestException("The finca with the given id was not asociated with the Usuario with the given id");
   
        return usuarioFinca;
    }
    
    async findFincasByUsuarioId(usuarioId: number): Promise<Finca[]> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["fincas"]});
        if (!usuario)
            throw new BadRequestException("The usuario with the given id was not found");
       
        return usuario.fincas;
    }
    
    async associateFincasUsuario(usuarioId: number, fincas: Finca[]): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["fincas"]});
    
        if (!usuario)
            throw new BadRequestException("The usuario with the given id was not found");
    
        for (let i = 0; i < fincas.length; i++) {
          const finca: Finca = await this.fincaRepository.findOne({where: {id: fincas[i].id}, relations: ["usuario"]});
          if (!finca)
            throw new BadRequestException("The finca with the given id was not found");
        }
    
        usuario.fincas = fincas;
        return await this.usuarioRepository.save(usuario);
      }
    
    async deleteFincaUsuario(usuarioId: number, fincaId: number){
        const finca: Finca = await this.fincaRepository.findOne({where: {id: fincaId}, relations: ["usuario"]});
        if (!finca)
            throw new BadRequestException("The finca with the given id was not found");
    
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["fincas"]});
        if (!usuario)
            throw new BadRequestException("The usuario with the given id was not found");
    
        const usuarioFinca: Finca = usuario.fincas.find(e => e.id === finca.id);
    
        if (!usuarioFinca)
            throw new BadRequestException("The finca with the given id is not associated to the usuario")
 
        usuario.fincas = usuario.fincas.filter(e => e.id !== fincaId);
        await this.usuarioRepository.save(usuario);
    }
}