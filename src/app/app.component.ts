import { Component, OnInit } from "@angular/core";
import { NgIf } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import { ICellRendererAngularComp } from "ag-grid-angular";
import {
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
  SelectionChangedEvent,
  ValueFormatterParams,
} from "ag-grid-community";

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

// Custom Cell Renderer Component
@Component({
  selector: "app-mission-result-renderer",
  standalone: true,
  imports: [NgIf],
  template: `
    <span *ngIf="value">
      <img
        [alt]="value"
        [src]="'https://www.ag-grid.com/example-assets/icons/' + value + '.png'"
        [height]="30"
      />
    </span>
  `,
  styles: [
    "img { width: auto; height: auto; } span {display: flex; height: 100%; justify-content: center; align-items: center} ",
  ],
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

// Custom Cell Renderer Component
@Component({
  selector: "app-company-logo-renderer",
  standalone: true,
  imports: [NgIf],
  template: `
    <span *ngIf="value">
      <img
        [alt]="value"
        [src]="
          'https://www.ag-grid.com/example-assets/space-company-logos/' +
          value.toLowerCase() +
          '.png'
        "
        [height]="30"
      />
      <p>{{ value }}</p>
    </span>
  `,
  styles: [
    "img {display: block; width: 25px; height: auto; maxHeight: 50%; margin-right: 12px; filter: brightness(1.1);} span {display: flex; height: 100%; width: 100%; align-items: center} p { text-overflow: ellipsis; overflow: hidden; white-space: nowrap }",
  ],
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
