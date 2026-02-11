import { Component } from '@angular/core';
import { LanguageService } from '../core/language.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  constructor(private readonly language: LanguageService) {}

  readonly currentYear = new Date().getFullYear();

  t(key: string): string {
    return this.language.t(key);
  }
}
