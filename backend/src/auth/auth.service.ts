import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor() {}

  createToken(payload: any) {
    return jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, 'yourSecretKey');
    } catch (e) {
      return null;
    }
  }
}
