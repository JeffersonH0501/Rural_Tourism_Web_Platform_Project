import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Finca } from '../fincas/fincas.entity';
import { UsuarioFincasService } from './usuario-fincas.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario-fincas')
@Controller('usuario-fincas')
export class UsuarioFincasController {
    constructor(private readonly usuarioFincasService: UsuarioFincasService) {}

    @Post(':usuarioId/fincas/:fincaId')
    async addFincaToUsuario(@Param('usuarioId') usuarioId: number, @Param('fincaId') fincaId: number) {
        return await this.usuarioFincasService.addFincaToUsuario(usuarioId, fincaId);
    }

    @Get(':usuarioId/fincas/:fincaId')
    async findFincaByUsuarioIdFincaId(@Param('usuarioId') usuarioId: number, @Param('fincaId') fincaId: number) {
        return await this.usuarioFincasService.findFincaByUsuarioIdFincaId(usuarioId, fincaId);
    }

    @Get(':usuarioId/fincas')
    async findFincasByUsuarioId(@Param('usuarioId') usuarioId: number) {
        return await this.usuarioFincasService.findFincasByUsuarioId(usuarioId);
    }

    @Post(':usuarioId/fincas')
    async associateFincasUsuario(@Param('usuarioId') usuarioId: number, @Body() fincas: Finca[]) {
        return await this.usuarioFincasService.associateFincasUsuario(usuarioId, fincas);
    }

    @Delete(':usuarioId/fincas/:fincaId')
    async deleteFincaUsuario(@Param('usuarioId') usuarioId: number, @Param('fincaId') fincaId: number) {
        return await this.usuarioFincasService.deleteFincaUsuario(usuarioId, fincaId);
    }
}