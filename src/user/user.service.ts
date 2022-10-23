import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async list() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async search({ search, type }: SearchDto) {
    const typeSearch = type === 'name' ? 'firstName' : 'email';

    const users = await this.prisma.user.findMany({
      where: {
        [typeSearch]: {
          contains: search,
        },
      },
    });

    return users;
  }
}
