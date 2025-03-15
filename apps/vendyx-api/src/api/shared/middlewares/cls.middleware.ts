import { ClsMiddleware } from 'nestjs-cls';

import { AuthService } from '@/auth/auth.service';
import { JwtPayload } from '@/auth/strategies/jwt/jwt.types';
import { CLS_OWNER_ID, CLS_SHOP_ID } from '@/persistence/persistence.module';

export const clsMiddleware = (authService: AuthService) => {
  return new ClsMiddleware({
    async setup(cls, req) {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const payload = await authService.decodeAccessToken<JwtPayload>(token);

      cls.set(CLS_SHOP_ID, req.headers.x_vendyx_shop_id);
      cls.set(CLS_OWNER_ID, payload?.sub);
    }
  }).use;
};
