import { Component } from '@angular/core';
import { APP_LINKS, APP_PROFILE } from '../core/app-profile';
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
  readonly profile = APP_PROFILE;
  readonly links = APP_LINKS;

  t(key: string): string {
    return this.language.t(key);
  }
}
