import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = false;
  treatmentsOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) { this.treatmentsOpen = false; }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.treatmentsOpen = false;
  }

  toggleTreatments(event: Event) {
    event.preventDefault();
    this.treatmentsOpen = !this.treatmentsOpen;
  }

  @HostListener('window:resize')
  onResize() {
    // close mobile menu when resizing to larger screens
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.isMenuOpen = false;
      this.treatmentsOpen = false;
    }
  }

}
