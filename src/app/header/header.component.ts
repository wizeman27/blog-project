import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // scrolledUp = false;
  // currentPosition = window.scrollY;
  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   let scroll = window.scrollY;
  //   if (scroll > this.currentPosition) {
  //     //console.log('scrolling down');
  //     this.scrolledUp = false;
  //   } else {
  //     //console.log('scrolling up');
  //     this.scrolledUp = true;
  //   }
  //   this.currentPosition = scroll;
  //   if (scroll <= 0) {
  //     this.scrolledUp = false;
  //   }
  // }
constructor(private dbService: DataStorageService) {}

saveAllToDatabase() {
  this.dbService.storePosts();
}

}

