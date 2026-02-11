import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-bubble',
  templateUrl: './contact-bubble.html',
  styleUrl: './contact-bubble.scss',
})
export class ContactBubble {
  isOpen = false;
  email = 'doctor@example.com';
  phone = '+917703220969';
  whatsappMessage = 'Hello Doctor, I need assistance.';

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
    return `https://wa.me/${this.phone.replace('+', '')}?text=${encodeURIComponent(this.whatsappMessage)}`;
  }
}
