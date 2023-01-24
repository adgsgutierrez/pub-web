import { AfterViewChecked, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/order/orders.service';
import { UserService } from 'src/app/services/user/user.service';
import { Validators } from 'src/app/shared/utils/validators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewChecked , OnInit {

  @ViewChild('historial') historial!: any;
  @ViewChild('perfil') perfil!: any;
  public template!: TemplateRef<any>;
  public indexSelect = 'historial';
  public historialData = [];
  public user: any;

  constructor(private userService: UserService, private historialService: OrdersService, private router: Router) {
    Validators.isLoged(this.router);
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.historialService.getActiveOrder(this.user.email).subscribe({
      next : (data: any) => {
        console.log(data);
        this.historialData = data;
      }
    });
  }

  ngAfterViewChecked(): void {
    this.template = this.historial;
  }

  segmentChanged($event): void{
    this.indexSelect = $event.detail.value;
    console.log('this.indexSelect' , this.indexSelect);
    this.template = (this.indexSelect === 'historial') ? this.historial : this.perfil;
  }
}
