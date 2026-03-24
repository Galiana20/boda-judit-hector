import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FotoService, FotoItem } from '../../services/foto.service';
import { I18nService } from '../../services/i18n.service';
import { DragonBallComponent } from '../../components/dragonball/dragonball';

@Component({
  selector: 'app-galeria',
  imports: [CommonModule, RouterLink, DragonBallComponent],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css'
})
export class GaleriaComponent implements OnInit {
  private fotoService = inject(FotoService);
  i18n = inject(I18nService);

  loading = signal(true);
  fotos = signal<FotoItem[]>([]);
  lightboxFoto = signal<FotoItem | null>(null);

  async ngOnInit(): Promise<void> {
    const fotos = await this.fotoService.getFotosAprobadas();
    this.fotos.set(fotos.sort((a, b) => b.fechaSubida?.seconds - a.fechaSubida?.seconds));
    this.loading.set(false);
  }

  openLightbox(foto: FotoItem): void {
    if (foto.tipo.startsWith('image/')) {
      this.lightboxFoto.set(foto);
    }
  }

  closeLightbox(): void {
    this.lightboxFoto.set(null);
  }

  navLightbox(dir: 1 | -1): void {
    const current = this.lightboxFoto();
    if (!current) return;
    const imgs = this.fotos().filter(f => f.tipo.startsWith('image/'));
    const idx = imgs.findIndex(f => f.id === current.id);
    const next = imgs[(idx + dir + imgs.length) % imgs.length];
    this.lightboxFoto.set(next);
  }
}
