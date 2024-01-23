import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import {
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
  SelectionChangedEvent,
  ValueFormatterParams,
} from "ag-grid-community";

import { MissionResultComponent } from "../../grid/renderer/mission-result/mission-result.component";
import { CompanyLogoComponent } from "../../grid/renderer/company-logo/company-logo.component";
import { CompanySelectorComponent } from "../../grid/editor/company-selector/company-selector.component";
import { AgGridModule } from "ag-grid-angular";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { Mission, MissionsService } from "src/app/services/missions.service";

@Component({
  selector: "app-mission-list",
  standalone: true,
  imports: [AgGridModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: "./mission-list.component.html",
  styleUrls: ["./mission-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MissionListComponent implements OnInit {
  themeClass = "ag-theme-material";

  // Row Data: The data to be displayed.
  rowData: Mission[] = [];

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    {
      field: "mission",
      width: 150,
      checkboxSelection: true,
    },
    {
      field: "company",
      width: 130,
      cellRenderer: CompanyLogoComponent,
      cellEditor: CompanySelectorComponent,
    },
    {
      field: "location",
      width: 225,
    },
    {
      field: "date",
      valueFormatter: this.dateFormatter,
    },
    {
      field: "price",
      width: 130,
      valueFormatter: (params) => {
        return params.value.toLocaleString() + " €";
      },
    },
    {
      field: "successful",
      width: 120,
      cellRenderer: MissionResultComponent,
    },
    { field: "rocket" },
  ];

  // Default Column Definitions: Apply configuration across all columns
  defaultColDef: ColDef = {
    filter: true, // Enable filtering on all columns
    editable: true, // Enable editing on all columns
  };

  // Load data into grid when ready
  constructor(private service: MissionsService) {}

  // Return formatted date value
  dateFormatter(params: ValueFormatterParams) {
    return new Date(params.value).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  onGridReady(params: GridReadyEvent) {
    console.log("grid ready: ", params);
    this.service.find().subscribe((data) => (this.rowData = data));
  }

  // Handle row selection changed event
  //  onSelectionChanged = (event: SelectionChangedEvent) => {
  onSelectionChanged = (event: SelectionChangedEvent) => {
    console.log("Row Selected!", event);
  };

  // Handle cell editing event
  //  onCellValueChanged = (event: CellValueChangedEvent) => {
  onCellValueChanged = (event: CellValueChangedEvent) => {
    console.log("New Cell Value:", event);
  };

  ngOnInit() {
    console.debug("app comp init done");
  }
}
