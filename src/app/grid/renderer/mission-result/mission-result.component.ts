import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
  selector: "app-mission-result-renderer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./mission-result.component.html",
  styleUrls: ["./mission-result.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MissionResultComponent implements ICellRendererAngularComp {
  // Init Cell Value
  public value!: string;
  agInit(params: ICellRendererParams): void {
    this.value = params.value ? "tick-in-circle" : "cross-in-circle";
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}
