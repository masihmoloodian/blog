import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface FirebaseUser {
  name: string;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: {
    identities: {
      email: string[];
    };
    sign_in_provider: string;
  };
  uid: string;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const user: FirebaseUser = request.user;
    return user?.uid;
  },
);
