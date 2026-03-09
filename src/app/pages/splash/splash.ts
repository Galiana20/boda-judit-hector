import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { I18nService, Lang } from '../../services/i18n.service';

@Component({
  selector: 'app-splash',
  imports: [FormsModule],
  templateUrl: './splash.html',
  styleUrl: './splash.css'
})
export class SplashComponent {
  auth = inject(AuthService);
  i18n = inject(I18nService);

  password = '';
  error = signal(false);
  shake = signal(false);
  showHint = signal(false);

  submit(): void {
    if (this.auth.tryLogin(this.password)) {
      this.error.set(false);
    } else {
      this.error.set(true);
      this.shake.set(true);
      setTimeout(() => this.shake.set(false), 600);
      this.password = '';
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.submit();
  }

  setLang(lang: Lang): void {
    this.i18n.setLang(lang);
  }
}
