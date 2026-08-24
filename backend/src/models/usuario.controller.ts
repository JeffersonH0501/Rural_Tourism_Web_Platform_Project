import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../models/usuario.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuariosService: UsuarioService, private readonly authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
       return this.authService.login(req);
    }

    @Post()
    async create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuariosService.create(createUsuarioDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.usuariosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usuariosService.findOne(+id);
    }

    @Get('/correo/:correo')
    async findOneByCorreo(@Param('correo') correo: string) {
        return this.usuariosService.findOneByCorreo(correo);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
        return this.usuariosService.update(+id, updateUsuarioDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.usuariosService.delete(id);
    }
}