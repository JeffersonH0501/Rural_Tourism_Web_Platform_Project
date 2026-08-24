import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TourService } from './tour.service';
import { TourDto } from './tour.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Tour')
@Controller('tour')
export class TourController {
    constructor(private readonly tourService: TourService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createTour(@Body() createTourDto: TourDto) {
      return this.tourService.createTour(createTourDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('/all')
    findAllTours() {
      return this.tourService.findAllTours();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findTourById(@Param('id') id: number) {
      return this.tourService.findTourById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateTour(@Param('id') id: number, @Body() updateTourDto: TourDto) {
        return this.tourService.updateTour(id, updateTourDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deletePropuesta(@Param('id') id: number) {
      return this.tourService.deleteTourById(id);
    }
}
