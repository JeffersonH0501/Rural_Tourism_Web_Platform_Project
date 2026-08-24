import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import {
  AgriculturalProductDto,
  CraftDto,
  FarmDto,
  PromotionDto,
  TourDto,
} from './catalog.dto';
import { CatalogService, Kind } from './catalog.service';
abstract class CatalogController {
  constructor(
    protected service: CatalogService,
    private kind: Kind,
  ) {}
  list() {
    return this.service.list(this.kind);
  }
  one(id: number) {
    return this.service.one(this.kind, id);
  }
  create(input: any, req: any) {
    return this.service.create(this.kind, input, req.user);
  }
  update(id: number, input: any, req: any) {
    return this.service.update(this.kind, id, input, req.user);
  }
  remove(id: number, req: any) {
    return this.service.remove(this.kind, id, req.user);
  }
}
@Controller('agricultural-products')
export class AgriculturalProductsController extends CatalogController {
  constructor(s: CatalogService) {
    super(s, 'agriculturalProducts');
  }
  @Get() all() {
    return this.list();
  }
  @Get(':id') byId(@Param('id', ParseIntPipe) id: number) {
    return this.one(id);
  }
  @UseGuards(AuthenticatedGuard) @Post() add(
    @Body() b: AgriculturalProductDto,
    @Req() r: any,
  ) {
    return this.create(b, r);
  }
  @UseGuards(AuthenticatedGuard) @Put(':id') edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() b: AgriculturalProductDto,
    @Req() r: any,
  ) {
    return this.update(id, b, r);
  }
  @UseGuards(AuthenticatedGuard) @Delete(':id') del(
    @Param('id', ParseIntPipe) id: number,
    @Req() r: any,
  ) {
    return this.remove(id, r);
  }
}
@Controller('crafts')
export class CraftsController extends CatalogController {
  constructor(s: CatalogService) {
    super(s, 'crafts');
  }
  @Get() all() {
    return this.list();
  }
  @Get(':id') byId(@Param('id', ParseIntPipe) id: number) {
    return this.one(id);
  }
  @UseGuards(AuthenticatedGuard) @Post() add(
    @Body() b: CraftDto,
    @Req() r: any,
  ) {
    return this.create(b, r);
  }
  @UseGuards(AuthenticatedGuard) @Put(':id') edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() b: CraftDto,
    @Req() r: any,
  ) {
    return this.update(id, b, r);
  }
  @UseGuards(AuthenticatedGuard) @Delete(':id') del(
    @Param('id', ParseIntPipe) id: number,
    @Req() r: any,
  ) {
    return this.remove(id, r);
  }
}
@Controller('farms')
export class FarmsController extends CatalogController {
  constructor(s: CatalogService) {
    super(s, 'farms');
  }
  @Get() all() {
    return this.list();
  }
  @Get(':id') byId(@Param('id', ParseIntPipe) id: number) {
    return this.one(id);
  }
  @UseGuards(AuthenticatedGuard) @Post() add(
    @Body() b: FarmDto,
    @Req() r: any,
  ) {
    return this.create(b, r);
  }
  @UseGuards(AuthenticatedGuard) @Put(':id') edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() b: FarmDto,
    @Req() r: any,
  ) {
    return this.update(id, b, r);
  }
  @UseGuards(AuthenticatedGuard) @Delete(':id') del(
    @Param('id', ParseIntPipe) id: number,
    @Req() r: any,
  ) {
    return this.remove(id, r);
  }
}
@Controller('tours')
export class ToursController extends CatalogController {
  constructor(s: CatalogService) {
    super(s, 'tours');
  }
  @Get() all() {
    return this.list();
  }
  @Get(':id') byId(@Param('id', ParseIntPipe) id: number) {
    return this.one(id);
  }
  @UseGuards(AuthenticatedGuard) @Post() add(
    @Body() b: TourDto,
    @Req() r: any,
  ) {
    return this.create(b, r);
  }
  @UseGuards(AuthenticatedGuard) @Put(':id') edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() b: TourDto,
    @Req() r: any,
  ) {
    return this.update(id, b, r);
  }
  @UseGuards(AuthenticatedGuard) @Delete(':id') del(
    @Param('id', ParseIntPipe) id: number,
    @Req() r: any,
  ) {
    return this.remove(id, r);
  }
}
@Controller('promotions')
export class PromotionsController extends CatalogController {
  constructor(s: CatalogService) {
    super(s, 'promotions');
  }
  @Get() all() {
    return this.list();
  }
  @Get(':id') byId(@Param('id', ParseIntPipe) id: number) {
    return this.one(id);
  }
  @UseGuards(AuthenticatedGuard) @Post() add(
    @Body() b: PromotionDto,
    @Req() r: any,
  ) {
    return this.create(b, r);
  }
  @UseGuards(AuthenticatedGuard) @Put(':id') edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() b: PromotionDto,
    @Req() r: any,
  ) {
    return this.update(id, b, r);
  }
  @UseGuards(AuthenticatedGuard) @Delete(':id') del(
    @Param('id', ParseIntPipe) id: number,
    @Req() r: any,
  ) {
    return this.remove(id, r);
  }
}
