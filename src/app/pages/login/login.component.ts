import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private timerNexPage = undefined;
  constructor(
    private router: Router,
    // private auth: AuthService,
    private alertController: AlertController,
    // private userService: UserService,
    private storage: StorageService
    ,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe({
      next: (data)=>{
        //http://localhost:8100/?s=finos-pub&l=mesa1
        const mesaOrder = data.l || '';
        if(mesaOrder === ''){
          this.presentAlert('Digita tu número de mesa' , data.s || 'finos-pub');
        } else {
          this.saveInformation(mesaOrder , data.s || 'finos-pub');
          this.redirect();
        }
      }
    });
  }

  public saveInformation(mesaOrder: string, session: string): void {
    this.storage.save('location' , mesaOrder);
    this.storage.save('session' , session);
  }

  public ngOnDestroy() {
    clearTimeout(this.timerNexPage);
  }

  private redirect(): void{
    this.timerNexPage = setTimeout(() => {
      this.router.navigateByUrl('/app/tabs/tab2');
    }, 1500);
  }

  // public startSession(): void {
  //   //
  //   this.auth.googleAuth().then(
  //     (user: any) => {
  //       console.log(user);
  //       if (user.additionalUserInfo.profile.verified_email) {
  //         this.userService.setUser(user).subscribe((isDataComplete) => {
  //           // if(isDataComplete){
  //           // } else {
  //           //   this.router.navigateByUrl('/app/complete-info');
  //           // }
  //           this.router.navigateByUrl('/app/tabs/tab2');
  //         });
  //       } else {
  //         this.presentAlert(
  //           'Tu correo parece no estar verificado, intenta con otro correo'
  //         );
  //       }
  //     },
  //     (_err) => {
  //       console.error(_err);
  //       this.presentAlert('No podemos iniciar la sesión');
  //     }
  //   );
  // }

  // private async presentAlert(message: string) {
  //   const alert = await this.alertController.create({
  //     header: 'Espera!',
  //     message,
  //     buttons: [
  //       {
  //         text: 'OK',
  //         role: 'confirm',
  //       },
  //     ],
  //   });
  //   await alert.present();
  // }


  private async presentAlert(message: string , secondParam: string) {
    const alert = await this.alertController.create({
      header: 'Espera!',
      message,
      inputs: [
        {
          type: 'number',
          placeholder: 'Mesa',
          min: 1,
          max: 100,
        },
      ],
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: (value) => {
            console.log('value' , value);
            this.saveInformation(value[0] , secondParam);
            this.redirect();
          },
        },
      ],
    });
    await alert.present();
  }
}
