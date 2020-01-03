import { Component, OnInit } from "@angular/core";
import { AuthTextService } from "../auth-text.service";
import { RegisterService } from "./register.service";
import { StatesResponse } from "./register";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
    private title: string[];
    loading: Boolean;
    states: StatesResponse[];

    constructor(
        private titleService: AuthTextService,
        private registerService: RegisterService
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
    }
}
