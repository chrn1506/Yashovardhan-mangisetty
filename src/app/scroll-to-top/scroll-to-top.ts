import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  templateUrl: './scroll-to-top.html',
  styleUrls: ['./scroll-to-top.scss'],
})
export class ScrollToTop {
  isVisible = false;

  @HostListener('window:scroll')
  onScroll() {
    // Show bubble when scrolled down 300px or more
    this.isVisible = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}