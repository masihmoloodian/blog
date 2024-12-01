import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private firebaseService: FirebaseService,
  ) {}

  async validateUser(decodedToken: any) {
    const firebaseUid = decodedToken.uid;
    return await this.userService.getByFirebaseUid(firebaseUid);
  }

  async login(dto: LoginDto) {
    try {
      const { email, password } = dto;

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        },
      );
      if (response.status !== 200) throw new UnauthorizedException();

      const data = await response.json();
      const { idToken, localId } = data;

      await this.userService.getByFirebaseUid(localId);

      return { idToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async register(dto: RegisterDto) {
    const { email, password, name } = dto;

    // Check if user already exists
    const existingUser = await this.userService.getByEmail(email);
    if (existingUser) throw new BadRequestException('Email is already in use');

    // Create user in Firebase
    const firebaseUser = await this.firebaseService.getAuth().createUser({
      email,
      password,
      displayName: name,
    });

    const user = await this.userService.create({
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
    });

    return user;
  }
}
