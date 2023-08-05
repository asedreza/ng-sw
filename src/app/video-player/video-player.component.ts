import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from "../notifivation/notification.service";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: [ './video-player.component.scss' ]
})
export class VideoPlayerComponent implements OnInit {
  htmlVideoElement!: HTMLVideoElement;

  @ViewChild('videoRef', { static: true }) set videoElementRef(elementRef: ElementRef) {
    this.htmlVideoElement = elementRef.nativeElement
  }

  htmlCanvasElement!: HTMLCanvasElement;

  @ViewChild('canvasRef', { static: true }) set canvasElementRef(elementRef: ElementRef) {
    this.htmlCanvasElement = elementRef.nativeElement
  }

  private stream!: MediaStream;
  images: string[] = [];
  previewingImage?: string;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.stream = stream
      this.htmlVideoElement.srcObject = stream;
    })
  }

  takePicture() {
    const context = this.htmlCanvasElement.getContext('2d');
    context?.drawImage(this.htmlVideoElement, 0, 0, 600, 500)
    this.images.push(this.htmlCanvasElement.toDataURL())

    this.notificationService.showNotification('Photo has been taken', {
      body: `picture number: #${ this.images.length }`,
      icon: this.images[this.images.length - 1],
      // image: this.images[this.images.length-1],
      // badge: this.images[this.images.length-1],
    })

  }

  previewImage(img: string) {
    if (this.previewingImage)
      this.previewingImage = undefined
    else
      this.previewingImage = img;
  }

  removeImage(imgIndex: number) {
    this.images?.splice(imgIndex, 1)
  }
}
