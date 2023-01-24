import { Component, OnInit } from '@angular/core';
import { Validators } from './../../shared/utils/validators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IItems , IProduct } from 'src/app/models/menu/i.items';
import { MenuService } from 'src/app/services/menu/menu.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public mesaOrder = '';
  public items: IItems[] = [{active: true, category:'',products:[]}];
  public indexSelect = 0;
  public products: IProduct[]=[];
  public arrayOrders: IProduct[]=[];
  public toastActive: any;
  public load = false;

  constructor(
    private router: Router,
    private storage: StorageService,
    private menuService: MenuService,
    private toastController: ToastController
  ) {
    Validators.isLoged(this.router);
  }

  ngOnInit(): void {
    this.arrayOrders = [];
    this.load = true;
    this.mesaOrder = this.storage.get('location').replace('mesa', '') || '';
    this.menuService.getItems().subscribe({
      next: items => {
        this.items = items;
        this.segmentChanged({detail:{value:0}});
        this.load = false;
      } });
  }

  segmentChanged($event: any): void {
    const item: any = this.items[$event.detail.value];
    this.products = item.products || [];
  }

  async adicionarItem(product: IProduct): Promise<void> {
    if(!this.arrayOrders.includes(product)){ this.arrayOrders.push(product); }
    if(this.toastActive){ this.toastActive.dismiss(); }
    this.toastActive = await this.toastController.create({
      message: 'Tienes para orden '+this.arrayOrders.length+' productos',
      duration: 100000,
      buttons: [
        {
          text: 'Continuar',
          role: 'info',
          handler: () => {
            this.router.navigateByUrl('/app/order-products' , { state : { products : this.arrayOrders } });
          }
        }
      ]
    });
    await this.toastActive.present();
  }


}
