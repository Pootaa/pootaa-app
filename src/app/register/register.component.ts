import { Component, OnInit } from "@angular/core";
import { AuthTextService } from "../auth-text.service";
import { RegisterService } from "./register.service";
import { ErrorHandlerService } from "../utils/errors/error-handler.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
    loading: boolean;
    states: [];
    errorType: string;
    passwordError: boolean;

    register(form) {
        this.passwordError = false;
        if (form.status === "VALID") {
            if (form.value.password !== form.value.confirmPassword) {
                this.passwordError = true;
                return false;
            }
            const { confirmPassword, ...payload } = form.value;
            this.registerService.register(payload);
        }
        return true;
    }

    constructor(
        private titleService: AuthTextService,
        private registerService: RegisterService,
        private errorHandler: ErrorHandlerService
    ) {}

    ngOnInit() {
        this.registerService.getStates();
        this.titleService.setAuthTitle([
            "Moving Your Cargo Just Got Easier.",
            "Come explore all the resources available for you for free"
        ]);
        this.registerService.loading.subscribe(resp => {
            this.loading = resp;
        });
        this.registerService.states.subscribe(resp => {
            this.states = resp;
        });
        this.errorHandler.errors.subscribe(resp => {
            this.errorType = resp.type;
        });
    }
}
