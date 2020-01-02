import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
    User,
    LoginResponse,
    LoginCredentials,
    RegisterCredentials,
    RegisterResponse
} from "./login";
import { HttpService } from "../utils/apiService/http.service";
import { ErrorHandlerService } from "../utils/errors/error-handler.service";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoginService {
    private loadingSubject = new BehaviorSubject<Boolean>(false);
    public loading: Observable<Boolean> = this.loadingSubject.asObservable();

    private isLoggedSubject = new BehaviorSubject<Boolean>(
        !!localStorage.getItem("TOKEN")
    );
    public isLoggedIn: Observable<
        Boolean
    > = this.isLoggedSubject.asObservable();

    private userSubject = new BehaviorSubject<User>(<User>{});
    public user: Observable<User> = this.userSubject.asObservable();

    login(data: LoginCredentials) {
        this.loadingSubject.next(true);
        this.http.post<LoginResponse>("/users/sign_in", data).subscribe(
            resp => {
                if (resp.success) {
                    localStorage.setItem("TOKEN", resp.token);
                    this.isLoggedSubject.next(true);
                    this.userSubject.next(resp.data);
                    this.router.navigate([""]);
                } else {
                    this.errorHandler.setError(resp.message, "login");
                }
            },
            err => {
                this.errorHandler.setError(
                    "Temporarily Unavailable. Try again later",
                    "login"
                );
            },
            () => {
                this.loadingSubject.next(false);
            }
        );
    }

    register(data: RegisterCredentials) {
        this.loadingSubject.next(true);
        this.http.post<RegisterResponse>("/users/sign_up", data).subscribe(
            resp => {
                if (resp.success) {
                    localStorage.setItem("TOKEN", resp.token);
                    this.isLoggedSubject.next(true);
                    this.userSubject.next(resp.data);
                    this.router.navigate([""]);
                } else {
                    this.errorHandler.setError(resp.message, "register");
                }
            },
            err => {
                this.errorHandler.setError(
                    "Temporarily Unavailable. Try again later",
                    "register"
                );
            },
            () => {
                this.loadingSubject.next(false);
            }
        );
    }

    constructor(
        private http: HttpService,
        private router: Router,
        private errorHandler: ErrorHandlerService
    ) {}
}
