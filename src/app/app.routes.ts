import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Header } from './header/header';
import { Footer } from './footer/footer';

export const routes: Routes = [
	{ path: '', component: Home },
	{ path: 'home', component: Home },
	{ path: 'header', component: Header },
	{ path: 'footer', component: Footer },
	{ path: '**', redirectTo: '' },
];
