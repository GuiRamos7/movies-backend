import { ForbiddenException, Injectable, ShutdownSignal } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup({ email, password }: AuthDto) {
    try {
      const hash = await argon.hash(password);
      const user = await this.prisma.user.create({
        data: { email, hash },
      });

      delete user.hash;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }

  async signin({ email, password }: AuthDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    const hash = await argon.hash(password);

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const pwMatches = await argon.verify(user.hash, hash);

    if (pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    delete user.hash;

    return user;
  }
}
