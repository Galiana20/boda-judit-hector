import {
  Component, OnInit, OnDestroy, AfterViewInit,
  signal, inject, ElementRef
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { I18nService } from '../../services/i18n.service';
import { DragonBallComponent } from '../../components/dragonball/dragonball';

interface Petal {
  id: number; left: number; size: number;
  duration: number; delay: number;
  type: 'petal' | 'heart' | 'star'; direction: 'right' | 'left';
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, TimelineModule, DragonBallComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  i18n = inject(I18nService);

  private intervalId: ReturnType<typeof setInterval> | null = null;
  private observer: IntersectionObserver | null = null;

  weddingDate = new Date('2026-10-02T18:00:00');
  days = signal(0);
  hours = signal(0);
  minutes = signal(0);
  seconds = signal(0);

  petals: Petal[] = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 12 + Math.random() * 18,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 15,
    type: (['petal', 'petal', 'petal', 'heart', 'star'] as const)[Math.floor(Math.random() * 5)],
    direction: Math.random() > 0.5 ? 'right' : 'left' as 'right' | 'left'
  }));

  scheduleIcons = ['pi-users', 'pi-heart-fill', 'pi-star-fill', 'pi-bolt'];
  scheduleColors = ['#C4974A', '#A50044', '#7A9E7E', '#004D98'];

  activeCat = signal<number | null>(null);
  private catPhraseIdx = [0, 0];

  photos = [
    { src: '/img/kiss.jpeg', caption: 'Kiss Me Here', wide: true },
    { src: '/img/ciudad.jpeg', caption: '', wide: false },
    { src: '/img/montanya.jpeg', caption: '', wide: false },
    { src: '/img/playa.jpeg', caption: '', wide: false },
    { src: '/img/futbol.jpeg', caption: 'Més que un casament', wide: true },
  ];

  masiaPhotos = [
    '/img/masia.jpg',
    '/img/jardins.jpg',
  ];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    this.el.nativeElement.querySelectorAll('.animate-on-scroll')
      .forEach((el: Element) => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.observer) this.observer.disconnect();
  }

  private updateCountdown(): void {
    const diff = this.weddingDate.getTime() - new Date().getTime();
    if (diff <= 0) { this.days.set(0); this.hours.set(0); this.minutes.set(0); this.seconds.set(0); return; }
    this.days.set(Math.floor(diff / 86400000));
    this.hours.set(Math.floor((diff % 86400000) / 3600000));
    this.minutes.set(Math.floor((diff % 3600000) / 60000));
    this.seconds.set(Math.floor((diff % 60000) / 1000));
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  pad(n: number): string { return n.toString().padStart(2, '0'); }

  catClick(catId: number): void {
    if (this.activeCat() === catId) {
      this.activeCat.set(null);
      return;
    }
    const phrases = catId === 0 ? this.i18n.T().cats.cat1 : this.i18n.T().cats.cat2;
    this.catPhraseIdx[catId] = (this.catPhraseIdx[catId] + 1) % phrases.length;
    this.activeCat.set(catId);
    setTimeout(() => { if (this.activeCat() === catId) this.activeCat.set(null); }, 4500);
  }

  catPhrase(catId: number): string {
    const phrases = catId === 0 ? this.i18n.T().cats.cat1 : this.i18n.T().cats.cat2;
    return phrases[this.catPhraseIdx[catId]];
  }
}
