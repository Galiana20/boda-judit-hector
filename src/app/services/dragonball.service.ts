import { Injectable, signal, computed } from '@angular/core';

const STORAGE_KEY = 'db_collected';
const TOTAL = 7;

@Injectable({ providedIn: 'root' })
export class DragonBallService {
  private _collected = signal<Set<number>>(this.loadFromStorage());

  collected = computed(() => this._collected());
  collectedCount = computed(() => this._collected().size);
  remaining = computed(() => TOTAL - this._collected().size);
  allCollected = computed(() => this._collected().size === TOTAL);

  isCollected(id: number): boolean {
    return this._collected().has(id);
  }

  collect(id: number): void {
    if (this._collected().has(id)) return;
    const next = new Set(this._collected());
    next.add(id);
    this._collected.set(next);
    this.saveToStorage(next);
  }

  reset(): void {
    const empty = new Set<number>();
    this._collected.set(empty);
    this.saveToStorage(empty);
  }

  private loadFromStorage(): Set<number> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Set();
      return new Set<number>(JSON.parse(raw));
    } catch {
      return new Set();
    }
  }

  private saveToStorage(s: Set<number>): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...s]));
  }
}
