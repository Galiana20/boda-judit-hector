import { Component, inject, signal, effect, OnInit } from '@angular/core';
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
export class App implements OnInit {
  auth = inject(AuthService);
  i18n = inject(I18nService);
  db = inject(DragonBallService);

  showVictory = signal(false);
  isMuted = signal(true);

  private audio: HTMLAudioElement | null = null;

  constructor() {
    effect(() => {
      if (this.db.allCollected() && !this.showVictory()) {
        this.showVictory.set(true);
      }
    });

    effect(() => {
      if (this.auth.isAuthenticated()) {
        this.initAudio();
      }
    });
  }

  ngOnInit(): void {}

  private initAudio(): void {
    if (this.audio) return;
    this.audio = new Audio('/music/Leaving Hogwarts.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.35;
    this.audio.muted = false;
    this.audio.play().catch(() => {
      // Si el navegador bloquea el autoplay, arrancamos muteado
      this.isMuted.set(true);
      if (this.audio) this.audio.muted = true;
    });
    this.isMuted.set(false);
  }

  toggleMute(): void {
    if (!this.audio) return;
    const muted = !this.isMuted();
    this.isMuted.set(muted);
    this.audio.muted = muted;
    if (!muted && this.audio.paused) {
      this.audio.play().catch(() => {});
    }
  }

  setLang(lang: Lang): void {
    this.i18n.setLang(lang);
  }

  onVictoryClosed(): void {
    this.showVictory.set(false);
    this.db.reset();
  }
}
