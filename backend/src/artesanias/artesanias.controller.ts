import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ArtesaniasDto } from './artesanias.dto';
import { ArtesaniasService } from './artesanias.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Artesanias')
@Controller('artesanias')
export class ArtesaniasController {

    constructor(private readonly artesaniaService: ArtesaniasService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post()
    createArtesania(@Body() createartesaniaDto: ArtesaniasDto) {
      return this.artesaniaService.createArtesania(createartesaniaDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/all')
    findAllArtesanias() {
      return this.artesaniaService.findAllArtesanias();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findArtesaniaById(@Param('id') id: number) {
      return this.artesaniaService.findArtesaniaById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateArtesania(@Param('id') id: number, @Body() updateArtesaniaDto: ArtesaniasDto) {
        return this.artesaniaService.updateArtesania(id, updateArtesaniaDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteArtesania(@Param('id') id: number) {
      return this.artesaniaService.deleteArtesaniaById(id);
    }
}
