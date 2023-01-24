import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private storage: StorageService , private afs: AngularFirestore) {}

  public setUser(user: any): Observable<boolean> {
    console.log('Us', user);
    let strData = btoa( JSON.stringify(user) );
    strData = 'PUB' + strData + 'FINOS';
    strData = btoa( strData );
    strData = btoa( strData );
    localStorage.setItem( 'd1e7bdf6ac0e4549d63092cfcaa2bc2a' , strData );
    return of(true);
  }

  public getUser(): any{
    try{
      const data = localStorage.getItem( 'd1e7bdf6ac0e4549d63092cfcaa2bc2a' );
      let strData = atob(data);
      strData = atob(strData);
      strData = strData.replace('PUB','').replace('FINOS', '');
      return JSON.parse( atob(strData) );
    } catch {
      return undefined;
    }
  }

  public saveUserOnline(user: any): void {
    this.setUser(user);
    this.afs.collection<any>('users').doc(user.email).set(user);
  }
}
