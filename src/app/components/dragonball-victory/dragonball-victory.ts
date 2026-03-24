import { Component, inject, output } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-dragonball-victory',
  templateUrl: './dragonball-victory.html',
  styleUrl: './dragonball-victory.css'
})
export class DragonBallVictoryComponent {
  i18n = inject(I18nService);
  closed = output<void>();

  close(): void {
    this.closed.emit();
  }
}
