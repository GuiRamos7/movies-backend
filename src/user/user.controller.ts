import { Body, Controller, Post } from '@nestjs/common';
import { SearchDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('list')
  list() {
    return this.userService.list();
  }

  @Post('search')
  search(@Body() dto: SearchDto) {
    return this.userService.search(dto);
  }
}
