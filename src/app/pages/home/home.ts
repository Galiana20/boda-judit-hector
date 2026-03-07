import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  signal,
  ElementRef
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  type: 'petal' | 'heart' | 'star';
  direction: 'right' | 'left';
}

interface ScheduleItem {
  time: string;
  event: string;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, ButtonModule, TimelineModule, CardModule, DividerModule, RippleModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
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
    direction: Math.random() > 0.5 ? 'right' : 'left'
  }));

  schedule: ScheduleItem[] = [
    {
      time: '17:30',
      event: 'Convocatoria',
      description: 'Os esperamos con los brazos abiertos. Venid preparados para una tarde inolvidable.',
      icon: 'pi-users',
      color: '#C4974A'
    },
    {
      time: '18:00',
      event: 'Ceremonia',
      description: 'El momento que tanto hemos esperado. Judit y Héctor se dan el "Sí, quiero".',
      icon: 'pi-heart-fill',
      color: '#D4868C'
    },
    {
      time: '19:00',
      event: 'Cóctel',
      description: 'Bebidas, aperitivos y los primeros brindis bajo el sol de La Garriga.',
      icon: 'pi-star-fill',
      color: '#7A9E7E'
    },
    {
      time: '20:30',
      event: 'Banquete',
      description: 'Una cena especial para celebrar juntos este día tan especial.',
      icon: 'pi-gift',
      color: '#C4974A'
    },
    {
      time: 'Noche',
      event: 'Fiesta & Baile',
      description: '¡A bailar y celebrar hasta que nos lo prohíban! La noche es nuestra.',
      icon: 'pi-bolt',
      color: '#D4868C'
    }
  ];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const elements = this.el.nativeElement.querySelectorAll('.animate-on-scroll');
    elements.forEach((el: Element) => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.observer) this.observer.disconnect();
  }

  private updateCountdown(): void {
    const now = new Date();
    const diff = this.weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
      this.days.set(0);
      this.hours.set(0);
      this.minutes.set(0);
      this.seconds.set(0);
      return;
    }

    this.days.set(Math.floor(diff / (1000 * 60 * 60 * 24)));
    this.hours.set(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.minutes.set(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    this.seconds.set(Math.floor((diff % (1000 * 60)) / 1000));
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  padZero(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
