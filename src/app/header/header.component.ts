import { Component, OnInit } from "@angular/core";
import { AuthTextService } from "../auth-text.service";
import { LoginService } from "../login/login.service";
import { User } from "../login/login";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
    invert: Boolean = false;
    sidebar: Boolean = false;
    loggedIn: Boolean;
    user: User;

    showSidebar() {
        this.sidebar = true;
    }

    hideSidebar() {
        this.sidebar = false;
    }
    constructor(
        private colorService: AuthTextService,
        private authService: LoginService
    ) {}

    ngOnInit() {
        this.colorService.headerColor.subscribe(
            resp => (this.invert = resp === "invert" ? true : false)
        );
        this.authService.isLoggedIn.subscribe(resp => {
            this.loggedIn = resp;
        });
        this.authService.user.subscribe(resp => {
            this.user = resp;
        });
    }
}
