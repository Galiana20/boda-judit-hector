import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragonBallService } from '../../services/dragonball.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-dragonball',
  imports: [CommonModule],
  templateUrl: './dragonball.html',
  styleUrl: './dragonball.css'
})
export class DragonBallComponent implements OnInit {
  @Input() ballId!: number;   // 1–7
  @Input() top?: string;
  @Input() left?: string;
  @Input() right?: string;
  @Input() bottom?: string;

  db = inject(DragonBallService);
  i18n = inject(I18nService);

  toast = signal('');
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {}

  get collected(): boolean {
    return this.db.isCollected(this.ballId);
  }

  get imgSrc(): string {
    return `/img/dragonballs/ball${this.ballId}.svg`;
  }

  collect(e: MouseEvent): void {
    e.stopPropagation();
    if (this.collected) return;

    this.db.collect(this.ballId);

    const t = this.i18n.T().dragonball;
    if (this.db.allCollected()) {
      this.showToast(t.allFound);
    } else {
      this.showToast(`${t.collected} ${this.db.remaining()} ${t.remaining}`);
    }
  }

  private showToast(msg: string): void {
    this.toast.set(msg);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(''), 3000);
  }
}
