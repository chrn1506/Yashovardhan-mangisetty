import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { ContactBubble } from './contact-bubble/contact-bubble';
import { ScrollToTop } from './scroll-to-top/scroll-to-top';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContactBubble, ScrollToTop],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  protected readonly title = signal('d-portfolio');

  constructor() {
    const pageTitle = 'Dr.Yashovardhan Mangisetty | Pulmonologist in Anantapur';
    const description =
      'Expert pulmonology care in Anantapur for asthma, COPD, lung infections, sleep and breathing disorders.';
    const canonicalUrl = 'https://fci.github.io/Yashovardhan-mangisetty/';

    this.titleService.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({
      property: 'og:image',
      content: `${canonicalUrl}assets/images/docter_image1.jpeg`,
    });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    this.setCanonical(canonicalUrl);
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
