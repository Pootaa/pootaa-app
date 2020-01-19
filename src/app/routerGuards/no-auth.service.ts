import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { LoginService } from "../login/login.service";

@Injectable({
    providedIn: "root"
})
export class NoAuthService implements CanActivate {
    private loggedIn;

    canActivate(route: ActivatedRouteSnapshot) {
        this.loginService.isLoggedIn.subscribe(resp => (this.loggedIn = resp));
        if (this.loggedIn) {
            this.router.navigate(["/"]);
            return false;
        }
        return true;
    }
    constructor(private loginService: LoginService, private router: Router) {}
}
