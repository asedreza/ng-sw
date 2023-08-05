import { Component, isDevMode, OnInit } from '@angular/core';
import { NotificationService } from "./notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: [ './notification.component.scss' ]
})
export class NotificationComponent implements OnInit {
  title: string = 'عنوان پیام';
  options: any = {
    body: 'متن پیام',
    icon: '/assets/icons/icon-72x72.png'
  };
  showModal!: boolean;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
  }

  onSubmit() {
    this.notificationService.showNotification(this.title, this.options)
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
