import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { env } from '../config/environment';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => req?.cookies?.access_token ?? null,
      secretOrKey: env.jwtSecret,
      ignoreExpiration: false,
    });
  }
  validate(payload: any) {
    return {
      id: Number(payload.sub),
      email: payload.email,
      role: payload.role,
    };
  }
}
