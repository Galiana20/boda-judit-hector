import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { AuthService } from '../../services/auth.service';
import { FotoService } from '../../services/foto.service';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

interface QueueFile {
  id: number;
  file: File;
  name: string;
  size: number;
  type: string;
  preview?: string;
  progress: number;
  status: 'pending' | 'uploading' | 'done' | 'error';
}

let nextId = 0;

@Component({
  selector: 'app-media',
  imports: [CommonModule, RouterLink],
  templateUrl: './media.html',
  styleUrl: './media.css'
})
export class MediaComponent {
  i18n = inject(I18nService);
  private storage = inject(Storage);
  private fotoService = inject(FotoService);
  private auth = inject(AuthService);

  isDragOver = signal(false);
  files = signal<QueueFile[]>([]);
  isUploading = signal(false);
  allDone = signal(false);

  mockGallery = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    color: ['#F5E8E0','#E8F0E8','#E8E8F5','#F5F0E8','#F0E8F5','#E8F5F0','#F5E8F0','#EEF5E8','#F5EBE8'][i],
    icon: ['pi-heart-fill','pi-camera','pi-star-fill','pi-image','pi-heart','pi-gift','pi-bolt','pi-camera','pi-star'][i],
  }));

  get totalDone(): number { return this.files().filter(f => f.status === 'done').length; }
  get hasPending(): boolean { return this.files().some(f => f.status === 'pending'); }

  onDragOver(event: DragEvent): void { event.preventDefault(); this.isDragOver.set(true); }
  onDragLeave(): void { this.isDragOver.set(false); }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
    const files = event.dataTransfer?.files;
    if (files) this.processFiles(Array.from(files));
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) this.processFiles(Array.from(input.files));
    (event.target as HTMLInputElement).value = '';
  }

  private processFiles(rawFiles: File[]): void {
    this.allDone.set(false);
    rawFiles
      .filter(f => f.type.startsWith('image/') || f.type.startsWith('video/'))
      .forEach(file => {
        const id = nextId++;
        const qf: QueueFile = { id, file, name: file.name, size: file.size, type: file.type, progress: 0, status: 'pending' };
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = e => this.files.update(list =>
            list.map(f => f.id === id ? { ...f, preview: e.target?.result as string } : f)
          );
          reader.readAsDataURL(file);
        }
        this.files.update(list => [...list, qf]);
      });
  }

  async submitFiles(): Promise<void> {
    const pending = this.files().filter(f => f.status === 'pending');
    if (!pending.length || this.isUploading()) return;

    this.isUploading.set(true);
    this.allDone.set(false);

    for (const qf of pending) {
      await this.uploadFile(qf);
    }

    this.isUploading.set(false);
    if (this.files().every(f => f.status === 'done')) {
      this.allDone.set(true);
    }
  }

  private uploadFile(qf: QueueFile): Promise<void> {
    return new Promise(resolve => {
      this.files.update(list => list.map(f => f.id === qf.id ? { ...f, status: 'uploading', progress: 0 } : f));

      const codigo = this.auth.codigoGuardat() || 'anonimo';
      const storageRef = ref(this.storage, `fotos/${codigo}/${Date.now()}_${qf.name}`);
      const task = uploadBytesResumable(storageRef, qf.file);

      task.on('state_changed',
        snapshot => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.files.update(list => list.map(f => f.id === qf.id ? { ...f, progress } : f));
        },
        _error => {
          this.files.update(list => list.map(f => f.id === qf.id ? { ...f, status: 'error' } : f));
          resolve();
        },
        async () => {
          try {
            const url = await getDownloadURL(task.snapshot.ref);
            const storagePath = task.snapshot.ref.fullPath;
            await this.fotoService.subirDatosFoto({ url, storagePath, nombre: qf.name, tipo: qf.type, tamano: qf.size });
            this.files.update(list => list.map(f => f.id === qf.id ? { ...f, status: 'done', progress: 100 } : f));
          } catch {
            this.files.update(list => list.map(f => f.id === qf.id ? { ...f, status: 'error' } : f));
          }
          resolve();
        }
      );
    });
  }

  removeFile(id: number): void {
    if (this.isUploading()) return;
    this.files.update(f => f.filter(file => file.id !== id));
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  triggerFileInput(): void {
    (document.getElementById('file-input') as HTMLInputElement)?.click();
  }
}
