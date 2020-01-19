import { Component, OnInit } from "@angular/core";
import { AuthTextService } from "../auth-text.service";
import { LoginService } from "../login/login.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    isLoggedIn: boolean = false;
    constructor(
        private colorService: AuthTextService,
        private loginService: LoginService
    ) {
        colorService.setHeaderColor("color");
    }

    ngOnInit() {
        this.loginService.isLoggedIn.subscribe(resp => (this.isLoggedIn = resp));
    }
}
