import { Router } from '@angular/router';

export class Validators{

    public static isLoged(router: Router): void {
        const location = sessionStorage.getItem('location') || '';
        if(location === ''){
            router.navigateByUrl('/');
        }
        const sesion = sessionStorage.getItem('session') || '';
        if(sesion === ''){
            router.navigateByUrl('/');
        }
    }
}
