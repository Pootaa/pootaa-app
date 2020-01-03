import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { LoginService } from "./login/login.service";

@Injectable({
    providedIn: "root"
})
export class AuthModuleService implements CanActivate {
    private loggedIn;
    canActivate(route: ActivatedRouteSnapshot) {
        this.loginService.isLoggedIn.subscribe(resp => (this.loggedIn = resp));
        console.log(this.loggedIn);
        if (!this.loggedIn) {
            this.router.navigate(["/auth/login"]);
            return false;
        }
        return true;
    }

    constructor(private router: Router, private loginService: LoginService) {}
}
