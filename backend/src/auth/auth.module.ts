/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsuarioService } from '../models/usuario.service';

import constants from '../config/constants';

import { UsuarioModule } from '../models/usuario.module';

import { AuthService } from './auth.service';

import { LocalStrategy } from './strategys/local-strategy';
import { JwtStrategy } from './strategys/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/models/usuario.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([UsuarioEntity]),
      UsuarioModule,
      PassportModule,
      JwtModule.register({
        secret: constants.JWT_SECRET,
        signOptions: { expiresIn: constants.JWT_EXPIRES_IN },
      })
      ],
    providers: [AuthService, UsuarioService, JwtService, LocalStrategy, JwtStrategy], 
    exports: [AuthService]
    
})
export class AuthModule {}