import { Component, OnInit } from "@angular/core";
import { ListingsService } from "./listings.service";
import { ErrorHandlerService } from "../utils/errors/error-handler.service";

@Component({
    selector: "app-package-listings",
    templateUrl: "./package-listings.component.html",
    styleUrls: ["./package-listings.component.scss"]
})
export class PackageListingsComponent implements OnInit {
    arr = Array(3);
    listings: object[] = []
    loading: boolean = false
    errorType: string
    getPackages() {
      this.loading = true
        this.listService.getPackageListings().subscribe(
            resp => {
                // this.listings = resp.data;
            },
            err => {
              console.error('I entered the error block', err.statusText)
                this.errorHandler.setError(
                    "Error fetching your package list",
                    "listings"
                );
            },
            ()=>{
              this.loading = false
            }
        );
    }
    constructor(
        private listService: ListingsService,
        private errorHandler: ErrorHandlerService
    ) {}

    ngOnInit() {
        this.getPackages();
        this.errorHandler.errors.subscribe(resp => {
            this.errorType = resp.type;
        });
    }
}
