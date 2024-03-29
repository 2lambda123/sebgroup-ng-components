import { Component, Input } from "@angular/core";

@Component({
  selector: "[app-table-th]",
  templateUrl: "./table-th.component.html"
})
export class TableTHComponent {
  @Input() label: string;
  @Input() active: boolean;
  @Input() ascending: boolean;

  // ------------- CONSTRUCTOR ------------
  constructor() {
  }

  // ------------- EVENTS ------------------
}
