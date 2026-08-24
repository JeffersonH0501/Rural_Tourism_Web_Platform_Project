import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductoAgricolaEntity } from '../productos_agricolas/producto_agricola.entity';
import { UsuarioProductosAgricolasService } from './usuario-productos_agricolas.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario-productosAgricolas')
@Controller('usuario-productos_agricolas')
export class UsuarioProductosAgricolasController {
    constructor(private readonly usuarioProductosAgricolasService: UsuarioProductosAgricolasService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':usuarioId/productos-agricolas/:productoId')
    async addProductoAgricolaToUsuario(@Param('usuarioId') usuarioId: number, @Param('productoId') productoId: number) {
        return await this.usuarioProductosAgricolasService.addProductoAgricolaToUsuario(usuarioId, productoId);
    }

    @Get(':usuarioId/productos-agricolas/:productoId')
    async findProductoAgricolaByUsuarioIdProductoId(@Param('usuarioId') usuarioId: number, @Param('productoId') productoId: number) {
        return await this.usuarioProductosAgricolasService.findProductoAgricolaByUsuarioIdProductoId(usuarioId, productoId);
    }

    @Get(':usuarioId/productos-agricolas')
    async findProductosAgricolasByUsuarioId(@Param('usuarioId') usuarioId: number) {
        return await this.usuarioProductosAgricolasService.findProductosAgricolasByUsuarioId(usuarioId);
    }

    @Post(':usuarioId/productos-agricolas')
    async associateProductosAgricolasUsuario(@Param('usuarioId') usuarioId: number, @Body() productosAgricolas: ProductoAgricolaEntity[]) {
        return await this.usuarioProductosAgricolasService.associateProductosAgricolasUsuario(usuarioId, productosAgricolas);
    }

    @Delete(':usuarioId/productos-agricolas/:productoId')
    async deleteProductoAgricolaUsuario(@Param('usuarioId') usuarioId: number, @Param('productoId') productoId: number) {
        return await this.usuarioProductosAgricolasService.deleteProductoAgricolaUsuario(usuarioId, productoId);
    }
}