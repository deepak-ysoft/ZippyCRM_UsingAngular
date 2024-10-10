import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToggleClassService } from '../../Services/toggle-folder/toggle-class.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor(private toggleClassService: ToggleClassService) {}
  onToggleClass(): void {
    this.toggleClassService.toggleClass();
  }
}
