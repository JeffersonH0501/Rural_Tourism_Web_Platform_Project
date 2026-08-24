import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Finca } from '../fincas/fincas.entity';
import { TourFincaService } from './tour-finca.service';
import { TourEntity } from '../tour/tour.entity';
import { ApiTags } from '@nestjs/swagger';
import { TourDto } from 'src/tour/tour.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Tour-finca')
@Controller('tour-finca')
export class TourFincaController {
    constructor(private readonly tourFincaService: TourFincaService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':fincaId/tours/:tourId')
    async addTourToFinca(@Param('fincaId') fincaId: number, @Param('tourId') tourId: number): Promise<Finca> {
        return this.tourFincaService.addTourToFinca(tourId, fincaId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':fincaId/tours')
    async findTourByFincaId(@Param('fincaId') fincaId: number): Promise<TourEntity> {
        return this.tourFincaService.findTourByFincaId(fincaId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('by-tour-date')
    async getFincasByTourDate(@Query('date') dateString: string): Promise<Finca[]> {
        const date = new Date(dateString);
        return this.tourFincaService.findFincasByTourDate(date);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':fincaId/tours')
    async updateTour(@Param('fincaId') fincaId: number, @Body() tourData: TourDto): Promise<TourEntity> {
        return await this.tourFincaService.updateTourInFinca(fincaId, tourData);
  }

    @UseGuards(JwtAuthGuard)
    @Delete(':fincaId/tours/:tourId')
    async deleteTourFinca(@Param('fincaId') fincaId: number, @Param('tourId') tourId: number) {
        await this.tourFincaService.deleteTourFinca(tourId, fincaId);
  }
}
