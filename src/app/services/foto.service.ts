import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, Timestamp } from '@angular/fire/firestore';
import { Storage, ref, deleteObject } from '@angular/fire/storage';
import { AuthService } from './auth.service';

export interface FotoData {
  url: string;
  storagePath?: string;
  nombre: string;
  tipo: string;
  tamano: number;
  codigoInvitado: string;
  fechaSubida: Timestamp;
  aprobada?: boolean;
}

export interface FotoItem extends FotoData {
  id: string;
}

@Injectable({ providedIn: 'root' })
export class FotoService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  private auth = inject(AuthService);

  async subirDatosFoto(datos: Pick<FotoData, 'url' | 'storagePath' | 'nombre' | 'tipo' | 'tamano'>): Promise<void> {
    await addDoc(collection(this.firestore, 'fotos'), {
      ...datos,
      codigoInvitado: this.auth.codigoGuardat(),
      fechaSubida: Timestamp.now(),
      aprobada: false
    });
  }

  async getTodasFotos(): Promise<FotoItem[]> {
    const snap = await getDocs(collection(this.firestore, 'fotos'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() as FotoData }));
  }

  async setAprobada(id: string, aprobada: boolean): Promise<void> {
    await updateDoc(doc(this.firestore, 'fotos', id), { aprobada });
  }

  async deleteFoto(foto: FotoItem): Promise<void> {
    if (foto.storagePath) {
      try {
        await deleteObject(ref(this.storage, foto.storagePath));
      } catch { /* si el archivo ya no existe en Storage, continuar */ }
    }
    await deleteDoc(doc(this.firestore, 'fotos', foto.id));
  }

  async getFotosAprobadas(): Promise<FotoItem[]> {
    const q = query(collection(this.firestore, 'fotos'), where('aprobada', '==', true));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() as FotoData }));
  }
}
