import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';
import { I18nService, Lang } from './services/i18n.service';
import { SplashComponent } from './pages/splash/splash';
import { InvitacionComponent } from './pages/invitacion/invitacion';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SplashComponent, InvitacionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  auth = inject(AuthService);
  i18n = inject(I18nService);

  setLang(lang: Lang): void {
    this.i18n.setLang(lang);
  }
}
