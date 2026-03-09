import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { AuthService } from '../../../services/auth.service';
import { I18nService } from '../../../services/i18n.service';

interface Acompanante {
  nombre: string;
  comentario: string;
  asiste: boolean;
}

interface Invitado {
  id: string;
  nombre: string;
  confirmacion: boolean;
  comentarios: string;
  numeroAcompanantes: number;
  acompanantesDetalle: Acompanante[];
}

@Component({
  selector: 'app-admin-invitados',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-invitados.html',
  styleUrl: './admin-invitados.css'
})
export class AdminInvitadosComponent implements OnInit {
  private firestore = inject(Firestore);
  auth = inject(AuthService);
  i18n = inject(I18nService);
  private router = inject(Router);

  loading = signal(true);
  invitados = signal<Invitado[]>([]);
  filtro = signal<'todos' | 'confirmats' | 'pendents'>('todos');

  invitadosFiltrats = computed(() => {
    const f = this.filtro();
    if (f === 'confirmats') return this.invitados().filter(i => i.confirmacion);
    if (f === 'pendents') return this.invitados().filter(i => !i.confirmacion);
    return this.invitados();
  });

  get totalConfirmats(): number { return this.invitados().filter(i => i.confirmacion).length; }
  get totalPendents(): number { return this.invitados().filter(i => !i.confirmacion).length; }
  get totalPersones(): number {
    return this.invitados().reduce((acc, i) => {
      if (!i.confirmacion) return acc;
      const acompAsisten = i.acompanantesDetalle.filter(a => a.asiste !== false).length;
      return acc + 1 + acompAsisten;
    }, 0);
  }

  async ngOnInit(): Promise<void> {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }
    const snap = await getDocs(collection(this.firestore, 'invitaciones'));
    const list: Invitado[] = snap.docs.map(d => ({
      id: d.id,
      nombre: d.data()['nombre'] ?? d.data()['Nombre'] ?? d.id,
      confirmacion: d.data()['confirmacion'] ?? false,
      comentarios: d.data()['comentarios'] ?? '',
      numeroAcompanantes: d.data()['acompanantes'] ?? d.data()['numeroAcompanantes'] ?? 0,
      acompanantesDetalle: d.data()['acompanantesDetalle'] ?? [],
    }));
    this.invitados.set(list.sort((a, b) => a.nombre.localeCompare(b.nombre)));
    this.loading.set(false);
  }

  acompAsisten(inv: Invitado): Acompanante[] {
    return inv.acompanantesDetalle.filter(a => a.asiste !== false);
  }
  acompNoAsisten(inv: Invitado): Acompanante[] {
    return inv.acompanantesDetalle.filter(a => a.asiste === false);
  }
}
