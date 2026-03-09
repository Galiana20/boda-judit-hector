import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FotoService, FotoItem } from '../../../services/foto.service';
import { I18nService } from '../../../services/i18n.service';

@Component({
  selector: 'app-admin-fotos',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-fotos.html',
  styleUrl: './admin-fotos.css'
})
export class AdminFotosComponent implements OnInit {
  auth = inject(AuthService);
  i18n = inject(I18nService);
  private fotoService = inject(FotoService);
  private router = inject(Router);

  loading = signal(true);
  fotos = signal<FotoItem[]>([]);
  togglingId = signal<string | null>(null);
  confirmingDeleteId = signal<string | null>(null);
  deletingId = signal<string | null>(null);

  get totalAprobadas(): number { return this.fotos().filter(f => f.aprobada).length; }
  get totalPendientes(): number { return this.fotos().filter(f => !f.aprobada).length; }

  async ngOnInit(): Promise<void> {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }
    const fotos = await this.fotoService.getTodasFotos();
    this.fotos.set(fotos.sort((a, b) => b.fechaSubida?.seconds - a.fechaSubida?.seconds));
    this.loading.set(false);
  }

  async toggleAprobada(foto: FotoItem): Promise<void> {
    if (this.togglingId()) return;
    this.togglingId.set(foto.id);
    const nuevo = !foto.aprobada;
    await this.fotoService.setAprobada(foto.id, nuevo);
    this.fotos.update(list => list.map(f => f.id === foto.id ? { ...f, aprobada: nuevo } : f));
    this.togglingId.set(null);
  }

  requestDelete(id: string): void {
    this.confirmingDeleteId.set(id);
  }

  cancelDelete(): void {
    this.confirmingDeleteId.set(null);
  }

  async confirmDelete(foto: FotoItem): Promise<void> {
    if (this.deletingId()) return;
    this.deletingId.set(foto.id);
    await this.fotoService.deleteFoto(foto);
    this.fotos.update(list => list.filter(f => f.id !== foto.id));
    this.confirmingDeleteId.set(null);
    this.deletingId.set(null);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  formatDate(ts: any): string {
    if (!ts?.seconds) return '—';
    return new Date(ts.seconds * 1000).toLocaleDateString('ca-ES', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }
}
