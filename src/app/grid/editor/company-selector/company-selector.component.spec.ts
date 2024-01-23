import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CompanySelectorComponent } from "./company-selector.component";

describe("CompanySelectorComponent", () => {
  let component: CompanySelectorComponent;
  let fixture: ComponentFixture<CompanySelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompanySelectorComponent],
    });
    fixture = TestBed.createComponent(CompanySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
