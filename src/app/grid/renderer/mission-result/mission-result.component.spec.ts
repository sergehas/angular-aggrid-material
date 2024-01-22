import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MissionResultComponent } from "./mission-result.component";

describe("MissionResultComponent", () => {
  let component: MissionResultComponent;
  let fixture: ComponentFixture<MissionResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MissionResultComponent],
    });
    fixture = TestBed.createComponent(MissionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
