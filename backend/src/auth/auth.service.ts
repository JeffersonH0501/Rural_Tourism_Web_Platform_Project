import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}
  async login(email: string, password: string) {
    const user = await this.users.findByEmailWithPassword(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash)))
      throw new UnauthorizedException('Invalid email or password');
    return {
      user,
      token: this.jwt.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }

  async session(token?: string) {
    if (!token) return null;
    try {
      const payload = this.jwt.verify<{ sub: number }>(token);
      return await this.users.findById(Number(payload.sub));
    } catch {
      return null;
    }
  }
}
