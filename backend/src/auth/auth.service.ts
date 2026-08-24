import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import constants from '../config/constants';
import { UsuarioEntity } from '../models/usuario.entity';
import { UsuarioService } from '../models/usuario.service';

@Injectable()
export class AuthService {
   constructor(
       private readonly usersService: UsuarioService,
       private readonly jwtService: JwtService
   ) {}

   async validateUser(correo: string, contraseña: string): Promise<any> {
        const usuario: UsuarioEntity = await this.usersService.findOneByCorreo(correo);
        if (usuario && usuario.contraseña === contraseña) {
            const { contraseña, ...result } = usuario;
            return result;
        }
        return null;
   }

    async login(usuario: any) {
        const payload = { correo: usuario.correo, sub: usuario.id };
        return {
            token: this.jwtService.sign(payload, { privateKey: constants.JWT_SECRET, expiresIn:constants.JWT_EXPIRES_IN }),
        };
    }

}