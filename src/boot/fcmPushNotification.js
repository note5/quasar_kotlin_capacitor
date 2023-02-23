import { boot } from 'quasar/wrappers'
import { PushNotifications } from '@capacitor/push-notifications';

export default boot(async ({ app, router }) => {
  const permission =await PushNotifications.requestPermissions();
  if (permission.receive === 'granted') await PushNotifications.register();
  PushNotifications.addListener('registration', (token) => {
    console.log("CHEMAIN fcm token ",JSON.stringify(token.value));
    localStorage.setItem('fcm_token', token.value)
  });
  //
  PushNotifications.addListener('registrationError', (err) => {
    console.log("fcm error ",error);
  });
  //
  PushNotifications.addListener('pushNotificationReceived',(notifications) => {
      console.log("fcm notification ",notifications);
    });
})



