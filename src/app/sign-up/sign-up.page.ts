import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonButton } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class SignUpPage implements OnInit {

  ngOnInit() {
  }

  email: string = '';
  password: string = '';

  constructor(
    private alertController: AlertController, 
    private router: Router,
    private authService: AuthService
  ) { }


  async onSubmit() {
   try{
    await this.authService.register(this.email, this.password);
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'You have successfully registered',
      buttons: ['OK']
    });
    await alert.present();
    this.router.navigate(['/login']);
   } catch (error) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'An error occurred while trying to register',
      buttons: ['OK']
    });
    await alert.present();
   }
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  onSignUp() {
    this.router.navigateByUrl("sign-up");
  }

}
