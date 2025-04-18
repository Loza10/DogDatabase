import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ACDrillSurrender } from '../../../models/ac-drill-surrender.model';

@Component({
  selector: 'app-drill-surrender',
  imports: [TableModule, DialogModule],
  templateUrl: './drill-surrender.component.html',
  styleUrl: './drill-surrender.component.css'
})
export class DrillSurrenderComponent {
  @Input() drillSurrenderReport: ACDrillSurrender[] = [];
  @Input() monthYear: string = "";
}
