import { Component, Input } from '@angular/core';
import { ACDrillAdopt } from '../../../models/ac-drill-adopt.model';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-drill-adopt',
  imports: [TableModule, DialogModule],
  templateUrl: './drill-adopt.component.html',
  styleUrl: './drill-adopt.component.css'
})
export class DrillAdoptComponent {
  @Input() drillAdoptReport: ACDrillAdopt[] = [];
  @Input() monthYear: string = "";

}
