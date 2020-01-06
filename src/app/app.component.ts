import { Component } from "@angular/core";
import { LoginService } from "./login/login.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    constructor(private loginService: LoginService) {}
    ngOnInit() {
        const userData = localStorage.getItem("USERDATA");
        if (userData) {
            this.loginService.setUser(JSON.parse(userData));
            return true;
        }
        this.loginService.logout();
    }
}
