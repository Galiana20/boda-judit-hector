import { Component, inject, signal, effect } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';
import { I18nService, Lang } from './services/i18n.service';
import { DragonBallService } from './services/dragonball.service';
import { SplashComponent } from './pages/splash/splash';
import { InvitacionComponent } from './pages/invitacion/invitacion';
import { DragonBallVictoryComponent } from './components/dragonball-victory/dragonball-victory';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SplashComponent, InvitacionComponent, DragonBallVictoryComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  auth = inject(AuthService);
  i18n = inject(I18nService);
  db = inject(DragonBallService);

  showVictory = signal(false);

  constructor() {
    effect(() => {
      if (this.db.allCollected() && !this.showVictory()) {
        this.showVictory.set(true);
      }
    });
  }

  setLang(lang: Lang): void {
    this.i18n.setLang(lang);
  }

  onVictoryClosed(): void {
    this.showVictory.set(false);
    this.db.reset();
  }
}
