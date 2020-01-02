import { Component, OnInit } from "@angular/core";
import { ErrorHandler } from "../utils/errors/error-handler";
import { ErrorHandlerService } from "../utils/errors/error-handler.service";

@Component({
    selector: "app-error-block",
    templateUrl: "./error-block.component.html",
    styleUrls: ["./error-block.component.scss"]
})
export class ErrorBlockComponent implements OnInit {
    errors: ErrorHandler;

    constructor(private errorService: ErrorHandlerService) {}

    ngOnInit() {
        this.errorService.errors.subscribe(resp => {
            this.errors = resp;
        });
    }
}
