import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'flight-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'boarding';
}
