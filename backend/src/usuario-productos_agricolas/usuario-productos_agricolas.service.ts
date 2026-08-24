import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoAgricolaEntity } from '../productos_agricolas/producto_agricola.entity';
import { UsuarioEntity } from '../models/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioProductosAgricolasService {
    constructor(
        @InjectRepository(ProductoAgricolaEntity)
        private readonly productoAgricolaRepository: Repository<ProductoAgricolaEntity>,
    
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async addProductoAgricolaToUsuario(usuarioId: number, productoId: number): Promise<UsuarioEntity> {
        const productoAgricola: ProductoAgricolaEntity = await this.productoAgricolaRepository.findOne({ where: {id:productoId } });
        if (!productoAgricola)
          throw new BadRequestException("The producto agricola with the given id was not found");
        
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: {id:usuarioId }, relations: ['productosAgricola'] })
        if (!usuario) 
          throw new BadRequestException("The usuario with the given id was not found");
        
        usuario.productosAgricola = [...usuario.productosAgricola, productoAgricola];
        return await this.usuarioRepository.save(usuario);
    }
    
    async findProductoAgricolaByUsuarioIdProductoId(usuarioId: number, productoId: number): Promise<ProductoAgricolaEntity> {
        const productoAgricola: ProductoAgricolaEntity = await this.productoAgricolaRepository.findOne({where: {id: productoId}, relations: ["usuario"]});
        if (!productoAgricola)
            throw new BadRequestException("The producto agricola with the given id was not found");
       
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["productosAgricola"]});
        if (!usuario)
            throw new BadRequestException("The usuario with the given id was not found");
   
        const usuarioProductoAgricola: ProductoAgricolaEntity = usuario.productosAgricola.find(e => e.id === productoAgricola.id);
   
        if (!usuarioProductoAgricola)
            throw new BadRequestException("The producto agricola with the given id was not asociated with the Usuario with the given id");
   
        return usuarioProductoAgricola;
    }
    
    async findProductosAgricolasByUsuarioId(usuarioId: number): Promise<ProductoAgricolaEntity[]> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["productosAgricola"]});
        if (!usuario)
            throw new BadRequestException("The usuario with the given id was not found");
       
        return usuario.productosAgricola;
    }
    
    async associateProductosAgricolasUsuario(usuarioId: number, productosAgricolas: ProductoAgricolaEntity[]): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["productosAgricola"]});
    
        if (!usuario)
            throw new BadRequestException("The usuario with the given id was not found");
    
        for (let i = 0; i < productosAgricolas.length; i++) {
          const productoAgricola: ProductoAgricolaEntity = await this.productoAgricolaRepository.findOne({where: {id: productosAgricolas[i].id}, relations: ["usuario"]});
          if (!productoAgricola)
            throw new BadRequestException("The producto agricola with the given id was not found");
        }
    
        usuario.productosAgricola = productosAgricolas;
        return await this.usuarioRepository.save(usuario);
      }
    
    async deleteProductoAgricolaUsuario(usuarioId: number, productoId: number){
        const productoAgricola: ProductoAgricolaEntity = await this.productoAgricolaRepository.findOne({where: {id: productoId}, relations: ["usuario"]});
        if (!productoAgricola)
            throw new BadRequestException("The producto agricola with the given id was not found");
    
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: usuarioId}, relations: ["productosAgricola"]});
        if (!usuario)
            throw new BadRequestException("The usuario with the given id was not found");
    
        const usuarioProductoAgricola: ProductoAgricolaEntity = usuario.productosAgricola.find(e => e.id === productoAgricola.id);
    
        if (!usuarioProductoAgricola)
            throw new BadRequestException("The producto agricola with the given id is not associated to the usuario")
 
        usuario.productosAgricola = usuario.productosAgricola.filter(e => e.id !== productoId);
        await this.usuarioRepository.save(usuario);
    }
}