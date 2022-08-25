import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageFacade } from '@flight-workspace/boarding/domain';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'boarding-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent {
  constructor(private manageFacade: ManageFacade) {}
}
