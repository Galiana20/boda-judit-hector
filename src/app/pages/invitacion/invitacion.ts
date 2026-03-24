import { Component, signal, inject, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { I18nService } from '../../services/i18n.service';

interface AcompananteDetalle {
  nombre: string;
  comentario: string;
  asiste: boolean;
}

interface InvitadoData {
  nombre: string;
  confirmacion: boolean;
  comentarios: string;
  numeroAcompanantes: number;
  acompanantesDetalle: AcompananteDetalle[];
}

type Estado = 'access' | 'loading' | 'ready' | 'modal';

@Component({
  selector: 'app-invitacion',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './invitacion.html',
  styleUrl: './invitacion.css'
})
export class InvitacionComponent implements OnInit, OnDestroy {
  private firestore = inject(Firestore);
  private fb = inject(FormBuilder);
  auth = inject(AuthService);
  i18n = inject(I18nService);

  private music = new Audio('/music/harry potter musica [T8D8vEcZrqM].mp3');

  codigoInput = '';
  estado = signal<Estado>('access');
  loading = signal(false);
  saving = signal(false);
  saved = signal(false);
  error = signal('');

  codigo = signal('');
  invitado = signal<InvitadoData | null>(null);

  totalPersones = computed(() => {
    const d = this.invitado();
    return d ? 1 + (d.numeroAcompanantes ?? 0) : 1;
  });

  form: FormGroup = this.fb.group({
    confirmacion: [false],
    comentarios: [''],
    acompanantesDetalle: this.fb.array([])
  });

  get acompanantes(): FormArray {
    return this.form.get('acompanantesDetalle') as FormArray;
  }

  async ngOnInit(): Promise<void> {
    this.music.loop = true;
    this.music.volume = 0.4;
    this.music.play().catch(() => {/* autoplay blocked, ignore */});

    const codiGuardat = this.auth.codigoGuardat();
    if (codiGuardat) {
      this.codigo.set(codiGuardat);
      await this.carregarInvitacio(codiGuardat, true);
    }
  }

  private async carregarInvitacio(code: string, obrirModal = false): Promise<void> {
    this.loading.set(true);
    this.estado.set('loading');
    this.error.set('');
    try {
      const snap = await getDoc(doc(this.firestore, 'invitaciones', code));
      if (!snap.exists()) {
        this.error.set('Invitació no trobada.');
        this.estado.set('access');
        return;
      }
      this.poblarFormulari(snap.data());
      this.estado.set(obrirModal ? 'modal' : 'ready');
    } catch {
      this.error.set('Error de connexió. Torna-ho a intentar.');
      this.estado.set('access');
    } finally {
      this.loading.set(false);
    }
  }

  private poblarFormulari(raw: any): void {
    const data: InvitadoData = {
      nombre: raw.nombre ?? raw.Nombre ?? '',
      confirmacion: raw.confirmacion ?? false,
      comentarios: raw.comentarios ?? '',
      numeroAcompanantes: raw.acompanantes ?? raw.numeroAcompanantes ?? 0,
      acompanantesDetalle: raw.acompanantesDetalle ?? []
    };
    this.invitado.set(data);
    this.form.patchValue({
      confirmacion: data.confirmacion ?? false,
      comentarios: data.comentarios ?? ''
    });
    this.acompanantes.clear();

    // Sempre crear exactament numeroAcompanantes entrades; usar detalls existents si n'hi ha
    const detalls: AcompananteDetalle[] = Array.from({ length: data.numeroAcompanantes }, (_, i) =>
      data.acompanantesDetalle[i] ?? { nombre: '', comentario: '', asiste: true }
    );

    detalls.forEach(a => {
      this.acompanantes.push(this.fb.group({
        nombre: [a.nombre ?? ''],
        comentario: [a.comentario ?? ''],
        asiste: [a.asiste ?? true]
      }));
    });
  }

  toggleAsiste(index: number): void {
    const ctrl = this.acompanantes.at(index);
    ctrl.patchValue({ asiste: !ctrl.value.asiste });
  }

  async buscarInvitacion(): Promise<void> {
    const code = this.codigoInput.trim().toUpperCase();
    if (!code) { this.error.set('Introdueix el teu codi d\'invitació.'); return; }
    this.codigo.set(code);
    await this.carregarInvitacio(code);
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') this.buscarInvitacion();
  }

  openModal(): void {
    this.saved.set(false);
    this.estado.set('modal');
  }

  closeModal(): void {
    this.auth.invitacioOberta.set(false);
  }

  ngOnDestroy(): void {
    this.music.pause();
    this.music.currentTime = 0;
  }

  async confirmar(): Promise<void> {
    if (this.saving()) return;
    this.saving.set(true);
    this.error.set('');

    // Guardem tots amb el camp asiste per tenir el registre complet
    const acompanantesDetalle = (this.form.value.acompanantesDetalle ?? []).map(
      (a: AcompananteDetalle) => ({
        nombre: a.nombre ?? '',
        comentario: a.comentario ?? '',
        asiste: a.asiste ?? true
      })
    );

    try {
      await updateDoc(doc(this.firestore, 'invitaciones', this.codigo()), {
        confirmacion: true,
        comentarios: this.form.value.comentarios ?? '',
        acompanantesDetalle
      });
      this.saved.set(true);
      this.invitado.update(d => d ? { ...d, confirmacion: true, comentarios: this.form.value.comentarios, acompanantesDetalle } : d);
    } catch {
      this.error.set(this.i18n.T().inv.errorSave);
    } finally {
      this.saving.set(false);
    }
  }
}
