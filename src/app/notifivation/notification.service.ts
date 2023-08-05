import { Injectable, isDevMode } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  showNotification(title: string, options: any) {
    Notification.requestPermission(res => {
      console.log(res)
    })

    if ('serviceWorker' in navigator && !isDevMode()) {
      navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
        serviceWorkerRegistration.showNotification('[SW] ' + title, options)
      })
    } else
      new Notification(title, options)
  }
}
