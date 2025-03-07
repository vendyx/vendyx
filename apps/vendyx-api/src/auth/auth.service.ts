import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken<TPayload extends object>(payload: TPayload) {
    return {
      accessToken: await this.jwtService.signAsync(payload)
    };
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  async decodeAccessToken<TPayload>(token: string) {
    return await this.jwtService.decode<TPayload>(token);
  }

  async hash(str: string) {
    const salt = await this.generateSalt();

    return bcrypt.hash(str, salt);
  }

  async compare(str: string, hash: string) {
    return bcrypt.compare(str, hash);
  }

  private async generateSalt() {
    return await bcrypt.genSalt();
  }
}
