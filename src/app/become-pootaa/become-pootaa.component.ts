import { Component, OnInit } from "@angular/core";
import { AuthTextService } from "../auth-text.service";
import { RegisterService } from "../register/register.service";
import * as allBanks from "../utils/banks.json";

@Component({
    selector: "app-become-pootaa",
    templateUrl: "./become-pootaa.component.html",
    styleUrls: ["./become-pootaa.component.scss"]
})
export class BecomePootaaComponent implements OnInit {
    states: [];
    lgas: String[];
    banks: [] = (allBanks as any).default;
    loading: Boolean;

    selectLGA(event) {
        this.lgas = [];
        const state = event.target.value;
        this.registerService.getLGAs(state.toLowerCase());
    }
    constructor(
        private titleService: AuthTextService,
        private registerService: RegisterService
    ) {}

    ngOnInit() {
        this.registerService.getStates();
        this.titleService.setAuthTitle([
            "Become a Pootaa",
            "To become a porter, we will require a few details from you!"
        ]);
        this.registerService.loading.subscribe(resp => {
            this.loading = resp;
        });
        this.registerService.states.subscribe(resp => {
            this.states = resp;
        });
        this.registerService.lgas.subscribe(resp => {
            this.lgas = resp;
        });
    }
}
