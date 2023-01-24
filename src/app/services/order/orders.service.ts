import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { IOrder } from 'src/app/models/order/orders.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private afs: AngularFirestore) { }

  public getActiveOrder(user: string): Observable<IOrder[]>{
    console.log(user);
    const items =  this.afs.collection<any>('orders', ref => ref.where('user.email', '==', user).orderBy('fechaFin', 'desc'));
    return items.valueChanges();
  }

  public setOrderNow(order: any): void {
    this.afs.collection<any>('orders').doc(order.idOrden).set(order);
  }
}
