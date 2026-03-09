import { Injectable, signal, computed } from '@angular/core';
import { ca, es, Texts } from './translations';

export type Lang = 'ca' | 'es';

const STORAGE_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  lang = signal<Lang>((localStorage.getItem(STORAGE_KEY) as Lang) ?? 'ca');

  T = computed<Texts>(() => this.lang() === 'ca' ? ca : es);

  setLang(lang: Lang): void {
    this.lang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }
}
