import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ICellEditorAngularComp } from "ag-grid-angular";
import { ICellEditorParams } from "ag-grid-community";
import { Mission, MissionsService } from "src/app/services/missions.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-company-selector",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
  ],

  templateUrl: "./company-selector.component.html",
  styleUrls: ["./company-selector.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CompanySelectorComponent
  implements ICellEditorAngularComp, AfterViewInit, OnInit
{
  @ViewChild("container", { read: ViewContainerRef })
  public container!: ViewContainerRef;

  public selectedValue: string | null | undefined = "invalid";

  public companies$?: Observable<string[]>;

  constructor(private service: MissionsService) {}

  ngOnInit(): void {
    this.companies$ = this.service.getCompanies();
    this.companies$.subscribe((x) => {
      console.log("companies", x);
    });
  }

  // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
  ngAfterViewInit() {
    window.setTimeout(() => {
      this.container.element.nativeElement.focus();
    });
  }

  agInit(params: ICellEditorParams<Mission, string, null>): void {
    this.selectedValue = params.value;
  }
  getValue() {
    return this.selectedValue;
  }

  isPopup?(): boolean {
    return true;
  }
}
