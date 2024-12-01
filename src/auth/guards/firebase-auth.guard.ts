import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FirebaseUser } from '../decorator/user.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase') {
  constructor(private userService: UserService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = (await super.canActivate(context)) as boolean;
    if (!canActivate) return false;

    const request = context.switchToHttp().getRequest();
    const firebaseUser: FirebaseUser = request.user;

    // Fetch the local user using the Firebase UID
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

    const localUser = await this.userService.getByFirebaseUid(firebaseUser.uid);
    if (!localUser)
      throw new UnauthorizedException('User not found in database');

    // Attach the local user to the request object
    request.user = localUser;
    return true;
  }
}
