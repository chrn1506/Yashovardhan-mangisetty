import { Component } from '@angular/core';
import { APP_LINKS, APP_PROFILE } from '../core/app-profile';

@Component({
  selector: 'app-contact-bubble',
  templateUrl: './contact-bubble.html',
  styleUrl: './contact-bubble.scss',
})
export class ContactBubble {
  isOpen = false;
  readonly profile = APP_PROFILE;
  readonly links = APP_LINKS;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  copyEmail() {
    if (navigator && (navigator as any).clipboard) {
      (navigator as any).clipboard.writeText(this.email);
    } else {
      const ta = document.createElement('textarea');
      ta.value = this.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  }

  get whatsappUrl(): string {
    return this.links.whatsappHref;
  }

  get email(): string {
    return this.profile.email;
  }
}
