import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "../utils/apiService/http.service";
import { ListingsResponse } from "./listings";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class ListingsService {

    getPackageListings(): Observable<ListingsResponse> {
        return this.http
            .get<ListingsResponse>("/users/package_lists")
            .pipe(map(resp => resp));
    }

    constructor(private http: HttpService) {}
}
