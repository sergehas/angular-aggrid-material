import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CompanyLogoComponent } from "./company-logo.component";

describe("CompanyLogoComponent", () => {
  let component: CompanyLogoComponent;
  let fixture: ComponentFixture<CompanyLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompanyLogoComponent],
    });
    fixture = TestBed.createComponent(CompanyLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
