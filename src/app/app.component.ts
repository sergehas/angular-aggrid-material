import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
  SelectionChangedEvent,
  ValueFormatterParams,
} from "ag-grid-community";
import { MissionResultComponent } from "./grid/renderer/mission-result/mission-result.component";
import { CompanyLogoComponent } from "./grid/renderer/company-logo/company-logo.component";

// Row Data Interface
interface IRow {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
}
@Component({
  selector: "app-main",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  themeClass = "ag-theme-material";

  // Return formatted date value
  dateFormatter(params: ValueFormatterParams) {
    return new Date(params.value).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Row Data: The data to be displayed.
  rowData: IRow[] = [];

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    {
      field: "select",
      width: 150,
    },
    {
      field: "mission",
      width: 150,
      checkboxSelection: true,
    },
    {
      field: "company",
      width: 130,
      cellRenderer: CompanyLogoComponent,
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
  constructor(private http: HttpClient) {}
  onGridReady(params: GridReadyEvent) {
    console.log("grid ready: ", params);
    this.http
      .get<
        IRow[]
      >("https://www.ag-grid.com/example-assets/space-mission-data.json")
      .subscribe((data) => (this.rowData = data));
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
