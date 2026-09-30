import { Injectable, signal, inject, computed } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

const STORAGE_KEY = 'auth';
const CODIGO_KEY = 'codigo';
export const FOTOS_CODE = 'FOTOS';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private firestore = inject(Firestore);

  isAuthenticated = signal(sessionStorage.getItem(STORAGE_KEY) === 'true');
  codigoGuardat = signal<string>(sessionStorage.getItem(CODIGO_KEY) ?? '');
  invitacioOberta = signal(false);
  isAdmin = computed(() => this.codigoGuardat() === 'ADMINGALIANA');
  // Acceso limitado: solo ver y subir fotos
  isFotosOnly = computed(() => this.codigoGuardat() === FOTOS_CODE);

  logout(): void {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(CODIGO_KEY);
    this.isAuthenticated.set(false);
    this.codigoGuardat.set('');
    this.invitacioOberta.set(false);
  }

  async tryLoginWithCodigo(codigo: string): Promise<'ok' | 'not-found' | 'error'> {
    const code = codigo.trim().toUpperCase();
    if (!code) return 'not-found';
    if (code === FOTOS_CODE) {
      this.saveSession(code);
      return 'ok';
    }
    try {
      const snap = await getDoc(doc(this.firestore, 'invitaciones', code));
      if (snap.exists()) {
        this.saveSession(code);
        return 'ok';
      }
      return 'not-found';
    } catch {
      return 'error';
    }
  }

  private saveSession(code: string): void {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    sessionStorage.setItem(CODIGO_KEY, code);
    this.isAuthenticated.set(true);
    this.codigoGuardat.set(code);
  }
}
