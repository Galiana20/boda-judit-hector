import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  private router = inject(Router);

  codigo = '';
  loading = signal(false);
  error = signal('');
  shake = signal(false);

  async submit(): Promise<void> {
    if (this.loading()) return;
    const code = this.codigo.trim();
    if (!code) {
      this.triggerError(this.i18n.T().splash.errorEmpty);
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const result = await this.auth.tryLoginWithCodigo(code);

    this.loading.set(false);

    if (result === 'ok') {
      this.auth.invitacioOberta.set(true);
      this.router.navigate(['/']);
    } else if (result === 'not-found') {
      this.triggerError(this.i18n.T().splash.errorNotFound);
      this.codigo = '';
    } else if (result === 'error') {
      this.triggerError(this.i18n.T().splash.errorConnection);
    }
  }

  private triggerError(msg: string): void {
    this.error.set(msg);
    this.shake.set(true);
    setTimeout(() => this.shake.set(false), 600);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.submit();
  }

  setLang(lang: Lang): void {
    this.i18n.setLang(lang);
  }
}
