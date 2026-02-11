import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";
import { ContactBubble } from "./contact-bubble/contact-bubble";
import { ScrollToTop } from "./scroll-to-top/scroll-to-top";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContactBubble, ScrollToTop],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('d-portfolio');
}
