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
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading: Observable<boolean> = this.loadingSubject.asObservable();

    private isLoggedSubject = new BehaviorSubject<boolean>(
        !!localStorage.getItem("TOKEN")
    );
    public isLoggedIn: Observable<
        boolean
    > = this.isLoggedSubject.asObservable();

    private userSubject = new BehaviorSubject<User>(<User>{});
    public user: Observable<User> = this.userSubject.asObservable();

    login(data: LoginCredentials) {
        this.loadingSubject.next(true);
        this.http.post<LoginResponse>("/users/sign_in", data).subscribe(
            resp => {
                if (resp.success) {
                    localStorage.setItem("TOKEN", resp.token);
                    this.setUser(resp.data);
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

    loginAsAgent(data: LoginCredentials) {
        this.loadingSubject.next(true);
        this.http.post<LoginResponse>("/users/pootaa/sign_in", data).subscribe(
            resp => {
                if (resp.success) {
                    localStorage.setItem("TOKEN", resp.token);
                    this.setUser(resp.data);
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
                    this.setUser(resp.data);
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

    registerAsAgent(data: FormData) {
        this.loadingSubject.next(true);
        this.http
            .post<RegisterResponse>("/users/pootaa/sign_up", data)
            .subscribe(
                resp => {
                    if (resp.success) {
                        localStorage.setItem("TOKEN", resp.token);
                        this.setUser(resp.data);
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

    setUser(data) {
        localStorage.setItem("USERDATA", JSON.stringify(data));
        this.isLoggedSubject.next(true);
        this.userSubject.next(data);
    }

    logout() {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("USERDATA");
        this.isLoggedSubject.next(false);
        this.userSubject.next(<User>{});
    }

    constructor(
        private http: HttpService,
        private router: Router,
        private errorHandler: ErrorHandlerService
    ) {}
}
