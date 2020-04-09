import { AlertController } from '@ionic/angular';

export class Utils {
  
  static async handleError(error, alertCtrl: AlertController, f) {
    const a = await alertCtrl.create({
      header: 'Error occurred',
      subHeader: '',
      message: `${error.message}. Do you want to retry ?`,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            a.dismiss().then(() => {});
          }
        },
        {
          text: 'YES',
          handler: () => {
            f();
          }
        }
      ]
    });

    await a.present();
  }
}