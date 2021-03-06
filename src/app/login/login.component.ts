import { Component, OnInit, Input } from "@angular/core";
import { AuthTextService } from "../auth-text.service";
import { LoginService } from "./login.service";
import { ErrorHandlerService } from "../utils/errors/error-handler.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    loading: boolean;
    errorType: string;
    pootaaAgent: boolean = false;
    constructor(
        private titleService: AuthTextService,
        private loginService: LoginService,
        private errorHandler: ErrorHandlerService
    ) {}

    showConfig() {}

    login(form) {
        if (form.status === "VALID") {
            if (this.pootaaAgent) {
                this.loginService.loginAsAgent(form.value);
            } else {
                this.loginService.login(form.value);
            }
        }
        return true;
    }

    switchLogin(isAgent) {
        this.pootaaAgent = isAgent;
    }

    ngOnInit() {
        this.titleService.setAuthTitle([
            "Moving Your Cargo Just Got Easier.",
            "Come explore all the resources available for you for free"
        ]);
        this.loginService.loading.subscribe(resp => {
            this.loading = resp;
        });
        this.errorHandler.errors.subscribe(resp => {
            this.errorType = resp.type;
        });
    }
}
