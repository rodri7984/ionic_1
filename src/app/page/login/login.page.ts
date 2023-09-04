import { Component, OnInit } from '@angular/core';
import { cuentas } from 'src/app/app.component';
import { UserService } from 'src/app/usuarios.service';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username : string = '';
  password : string = '';



constructor(private router: Router, private userService: UserService, private alertController: AlertController) { }

  ngOnInit() {
}


async alertaNoExiste(message : string) {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: message,
    buttons: ['OK'],
  });

  await alert.present();
}

  login(): void {
    const user = cuentas.find(u => u.username === this.username);
    console.log(this.username, this.password)
    if (user) {
      if (user.password === this.password) {

        
        this.userService.setCurrentUser(user);
        
        this.username = '';
        this.password = '';

        this.router.navigate(['/home']);

      } else {
        this.alertaNoExiste('Contraseña incorrecta')
        
      }
    } else {
      this.alertaNoExiste('usuario incorrecto')
      
    }
  }

}


