import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ICellRendererParams } from "ag-grid-community";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-company-logo",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./company-logo.component.html",
  styleUrls: ["./company-logo.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CompanyLogoComponent implements ICellRendererAngularComp {
  // Init Cell Value
  public value!: string;
  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}
