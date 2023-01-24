import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IOrder } from 'src/app/models/order/orders.interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrdersService } from 'src/app/services/order/orders.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-complete-information',
  templateUrl: './complete-information.component.html',
  styleUrls: ['./complete-information.component.scss'],
})
export class CompleteInformationComponent implements OnInit {
  public isRegisterManual = false;
  public user = { name: '', email: '', phone: '', auth: 'app' };
  private order: IOrder | any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private auth: AuthService,
    private userService: UserService,
    private orderService: OrdersService
  ) {
    // Validación de orden
    this.order = this.router.getCurrentNavigation().extras.state;
    if (!this.order) {
      this.router.navigate(['/app/tabs/tab2'], { replaceUrl: true });
    }
  }

  registerSession(): void {
    this.isRegisterManual = true;
  }

  ngOnInit() {
    this.isRegisterManual = false;
    // validacion de usuario
    const us = this.userService.getUser();
    if (us) {
      // alert('bienvenido ' + us.name);
      this.order.user = us;
      this.setUser(us);
    }
  }

  public setUserRegister(): void {
    this.setUser(this.user);
  }

  public startSession(): void {
    this.auth.googleAuth().then(
      (user: any) => {
        if (user.additionalUserInfo.profile.verified_email) {
          this.setUser({
            name: user.additionalUserInfo.profile.name,
            email: user.additionalUserInfo.profile.email,
            phone: null,
            auth: 'google',
          });
        } else {
          this.presentAlert(
            'Tu correo parece no estar verificado, intenta con otro correo'
          );
        }
      },
      (_err) => {
        console.error(_err);
        this.presentAlert('No podemos iniciar la sesión');
      }
    );
  }

  private async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Espera!',
      message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
    });
    await alert.present();
  }

  private setUser(
    data:
      | { name: string; email: string; phone: string; auth: 'google' | 'app' }
      | any
  ): void {
    console.log('DATA' , data);
    this.userService.saveUserOnline(data);
    this.order.user = data;
    this.completeOrder();
  }

  private completeOrder(): void {
    this.order.fechaFin = new Date();
    console.log(this.order);
    this.orderService.setOrderNow(this.order);
    this.router.navigate(['/app/tabs/tab3'], { replaceUrl: true });
  }
}
