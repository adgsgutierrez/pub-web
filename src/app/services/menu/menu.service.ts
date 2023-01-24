import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { filter, map, Observable } from 'rxjs';
import { IItems } from 'src/app/models/menu/i.items';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private itemsCollectionSet: AngularFirestoreCollection<IItems>;

  constructor( private afs: AngularFirestore ) {
  }

  public getItems(): Observable<IItems[]>{
    const admin = sessionStorage.getItem('session') || '';
    this.itemsCollectionSet = this.afs.collection<any>(admin).doc('menu').collection('items');
    return this.itemsCollectionSet.auditTrail().pipe(map(
      actions => actions.map(a => {
      const data = a.payload.doc.data() as IItems;
      const id = a.payload.doc.id;
      return { id, ...data };
    })),
    map( (items) => items.filter( item => (item.active && (item.products.filter( p => p.active).length > 0) ) ))
    );
  }
}
