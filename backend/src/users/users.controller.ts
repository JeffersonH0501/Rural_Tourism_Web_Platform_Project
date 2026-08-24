import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { AdminGuard } from '../auth/admin.guard';
import { RegisterUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}
  @Post() register(@Body() input: RegisterUserDto) {
    return this.users.register(input);
  }
  @UseGuards(AuthenticatedGuard, AdminGuard) @Get() all() {
    return this.users.findAll();
  }
  @UseGuards(AuthenticatedGuard) @Get('me') me(@Req() req: any) {
    return this.users.findById(req.user.id);
  }
  @UseGuards(AuthenticatedGuard) @Patch('me') updateMe(
    @Req() req: any,
    @Body() input: UpdateUserDto,
  ) {
    return this.users.update(req.user.id, input);
  }
  @UseGuards(AuthenticatedGuard) @Delete('me') removeMe(@Req() req: any) {
    return this.users.remove(req.user.id);
  }
  @UseGuards(AuthenticatedGuard, AdminGuard) @Delete(':id') remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.users.remove(id);
  }
}
