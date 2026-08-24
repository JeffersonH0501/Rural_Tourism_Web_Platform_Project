import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ArtesaniasEntity } from '../artesanias/artesanias.entity';
import { UsuarioArtesaniasService } from './usuario-artesanias.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Usuario-artesanias')
@Controller('usuario-artesanias')
export class UsuarioArtesaniasController {
    constructor(private readonly usuarioArtesaniasService: UsuarioArtesaniasService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':usuarioId/artesanias/:artesaniaId')
    async addArtesaniaToUsuario(@Param('usuarioId') usuarioId: number, @Param('artesaniaId') artesaniaId: number) {
        return await this.usuarioArtesaniasService.addArtesaniaToUsuario(usuarioId, artesaniaId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':usuarioId/artesanias/:artesaniaId')
    async findArtesaniaByUsuarioIdArtesaniaId(@Param('usuarioId') usuarioId: number, @Param('artesaniaId') artesaniaId: number) {
        return await this.usuarioArtesaniasService.findArtesaniaByUsuarioIdArtesaniaId(usuarioId, artesaniaId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':usuarioId/artesanias')
    async findArtesaniasByUsuarioId(@Param('usuarioId') usuarioId: number) {
        return await this.usuarioArtesaniasService.findArtesaniasByUsuarioId(usuarioId);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':usuarioId/artesanias')
    async associateArtesaniasUsuario(@Param('usuarioId') usuarioId: number, @Body() artesanias: ArtesaniasEntity[]) {
        return await this.usuarioArtesaniasService.associateArtesaniasUsuario(usuarioId, artesanias);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':usuarioId/artesanias/:artesaniaId')
    async deleteArtesaniaUsuario(@Param('usuarioId') usuarioId: number, @Param('artesaniaId') artesaniaId: number) {
        return await this.usuarioArtesaniasService.deleteArtesaniaUsuario(usuarioId, artesaniaId);
    }
}