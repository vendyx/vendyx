import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@/config/config.service';
import { UserRepository } from '@/persistence/repositories/user.repository';

import { JwtPayload } from '../jwt.types';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT.SECRET')
    });
  }

  /**
   * Receives the payload from the token and validate if its data contains a valid user.
   * Executes after the `guard.canActivate` and before the `guard.handleRequest` method.
   */
  async validate(payload: JwtPayload) {
    const { sub } = payload;

    const user = await this.userRepository.findById(sub);

    if (!user) {
      // handled by the guard.handleRequest method
      return null;
    }

    return user;
  }
}
