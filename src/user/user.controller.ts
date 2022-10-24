import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/gaurd';
import { SearchDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }

  @Post('list')
  list() {
    return this.userService.list();
  }

  @Post('search')
  search(@Body() dto: SearchDto) {
    return this.userService.search(dto);
  }
}
