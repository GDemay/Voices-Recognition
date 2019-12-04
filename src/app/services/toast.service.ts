import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async showToast(msg, color) {
    if (color == null) {
      color = 'primary';
    }
    this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'top',
      color: color
    }).then(toast => toast.present());
  }
}
