import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, distinct, map, mergeAll, toArray } from "rxjs";

export interface Mission {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
}

@Injectable({
  providedIn: "root",
})
export class MissionsService {
  constructor(private http: HttpClient) {}

  find(): Observable<Mission[]> {
    return this.http.get<Mission[]>(
      "https://www.ag-grid.com/example-assets/space-mission-data.json"
    );
  }

  getCompanies(): Observable<string[]> {
    return this.find().pipe(
      mergeAll(),
      map((x) => x.company),
      distinct(),
      toArray()
    );
  }
}
