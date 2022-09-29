import { AfterViewInit, Component } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'rizwan-lemon-mart-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements AfterViewInit {
  // @ViewChild('unmonitored') unmonitoredE1?: HTMLElement;

  constructor(private focusMonitor: FocusMonitor) {}

  ngAfterViewInit() {
    this.focusMonitor.stopMonitoring(
      document.getElementById('Button1') as HTMLElement
    );
    this.focusMonitor.stopMonitoring(
      document.getElementById('Button2') as HTMLElement
    );
    this.focusMonitor.stopMonitoring(
      document.getElementById('Button3') as HTMLElement
    );
    this.focusMonitor.stopMonitoring(
      document.getElementById('Button4') as HTMLElement
    );
  }
}
