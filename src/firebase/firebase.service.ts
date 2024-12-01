import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private defaultApp: admin.app.App;

  constructor() {
    this.defaultApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_PROJECT_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PROJECT_PRIVATE_KEY,
      }),
    });
  }

  getAuth() {
    return this.defaultApp.auth();
  }
}
