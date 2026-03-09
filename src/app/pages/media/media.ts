import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../services/i18n.service';

interface UploadedFile {
  name: string; size: number; type: string;
  preview?: string; progress: number; status: 'uploading' | 'done' | 'error';
}

@Component({
  selector: 'app-media',
  imports: [CommonModule, RouterLink],
  templateUrl: './media.html',
  styleUrl: './media.css'
})
export class MediaComponent {
  i18n = inject(I18nService);

  isDragOver = signal(false);
  uploadedFiles = signal<UploadedFile[]>([]);
  totalUploaded = signal(0);

  mockGallery = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    color: ['#F5E8E0','#E8F0E8','#E8E8F5','#F5F0E8','#F0E8F5','#E8F5F0','#F5E8F0','#EEF5E8','#F5EBE8'][i],
    icon: ['pi-heart-fill','pi-camera','pi-star-fill','pi-image','pi-heart','pi-gift','pi-bolt','pi-camera','pi-star'][i],
  }));

  onDragOver(event: DragEvent): void { event.preventDefault(); this.isDragOver.set(true); }
  onDragLeave(): void { this.isDragOver.set(false); }

  onDrop(event: DragEvent): void {
    event.preventDefault(); this.isDragOver.set(false);
    const files = event.dataTransfer?.files;
    if (files) this.processFiles(Array.from(files));
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) this.processFiles(Array.from(input.files));
  }

  private processFiles(files: File[]): void {
    files.filter(f => f.type.startsWith('image/') || f.type.startsWith('video/')).forEach(file => {
      const newFile: UploadedFile = { name: file.name, size: file.size, type: file.type, progress: 0, status: 'uploading' };
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => { newFile.preview = e.target?.result as string; };
        reader.readAsDataURL(file);
      }
      this.uploadedFiles.update(f => [...f, newFile]);
      this.simulateUpload(newFile);
    });
  }

  private simulateUpload(file: UploadedFile): void {
    const iv = setInterval(() => {
      const cur = this.uploadedFiles();
      const idx = cur.findIndex(f => f.name === file.name && f.status === 'uploading');
      if (idx === -1) { clearInterval(iv); return; }
      const updated = [...cur];
      updated[idx] = { ...updated[idx], progress: Math.min(updated[idx].progress + 15, 100) };
      if (updated[idx].progress >= 100) { updated[idx].status = 'done'; this.totalUploaded.update(n => n + 1); clearInterval(iv); }
      this.uploadedFiles.set(updated);
    }, 200);
  }

  removeFile(index: number): void {
    if (this.uploadedFiles()[index].status === 'done') this.totalUploaded.update(n => Math.max(0, n - 1));
    this.uploadedFiles.update(f => f.filter((_, i) => i !== index));
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  triggerFileInput(): void { (document.getElementById('file-input') as HTMLInputElement)?.click(); }
}
