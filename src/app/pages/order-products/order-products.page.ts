import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/menu/i.items';
import { IOrder } from 'src/app/models/order/orders.interfaces';
import { IProductOrder } from 'src/app/models/order/product.interface';
import { StorageService } from 'src/app/services/storage/storage.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.page.html',
  styleUrls: ['./order-products.page.scss'],
})
export class OrderProductsPage implements OnInit {

  public products: IProduct[] = [];
  public order: IOrder;

  constructor(private router: Router, private storage: StorageService) { }

  ngOnInit() {
    const products = this.router.getCurrentNavigation().extras.state;
    if (!products){
      this.router.navigate(['/app/tabs/tab2'], {replaceUrl: true});
    }
    this.products = products.products;
    this.order = {
      idOrden: uuidv4(),
      fechaInicio : new Date(),
      idMesa : this.storage.get('location'),
      fechaFin : new Date(),
      pedido : [],
      totalPagado : 0,
      enviado: false,
      facturado: false
    };

    products.products.forEach(element => {
      this.order.pedido.push({
        cantidad: 0,
        idProducto: element.id,
        nameProducto : element.ref,
        valor: element.price,
        image: element.images
      });
    });

    console.log(products);
  }

  operate( op: 'add' | 'minus' , productInput: IProductOrder ): void {
    if (op === 'add'){
      productInput.cantidad += 1;
    }
    else if (op === 'minus'){
      productInput.cantidad = (productInput.cantidad === 0) ? 0 : productInput.cantidad - 1;
    }
    this.order.totalPagado = 0;
    this.order.pedido.forEach( (elem)=>{ this.order.totalPagado += (elem.cantidad * elem.valor); });
  }

  sendToOrder(): void {
    this.router.navigate(['app/complete-info'], { state: this.order});
  }
}
