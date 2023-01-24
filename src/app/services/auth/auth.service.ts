import { Injectable } from '@angular/core';
// import { FirebaseAuthentication } from '@awesome-cordova-plugins/firebase-authentication/ngx';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afs: AngularFirestore, // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    // private firebaseAuthentication: FirebaseAuthentication,
  ) { }

  public googleAuth(): Promise<any> {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  private async authLogin(provider: any): Promise<any> {
    return this.afAuth.signInWithPopup(provider);
    // return this.firebaseAuthentication.signInWithGoogle( await this.getIdToken() , await this.getCurrentUser());
  }

  // private async getIdToken (){
  //   const currentUser = this.getCurrentUser();
  //   if (!currentUser) {
  //     return;
  //   }
  //   const result = await this.firebaseAuthentication.getIdToken(true);
  //   return result.token;
  // };

  // private async getCurrentUser (){
  //   const result = await this.firebaseAuthentication.getCurrentUser();
  //   return result.user;
  // };
}
