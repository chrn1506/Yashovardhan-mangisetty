import { Component, HostListener } from '@angular/core';
import { AppLanguage, LanguageService } from '../core/language.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private readonly language: LanguageService) {}

  isMenuOpen = false;
  treatmentsOpen = false;
  readonly languages: AppLanguage[] = ['en', 'hi', 'te'];

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

  setLanguage(lang: AppLanguage): void {
    this.language.setLanguage(lang);
  }

  currentLanguage(): AppLanguage {
    return this.language.activeLang();
  }

  t(key: string): string {
    return this.language.t(key);
  }

}
