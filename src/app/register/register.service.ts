import { Injectable } from "@angular/core";
import { HttpService } from "../utils/apiService/http.service";
import { ErrorHandlerService } from "../utils/errors/error-handler.service";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { RegisterCredentials, RegisterResponse } from "../login/login";
import { Router } from "@angular/router";
import { LoginService } from "../login/login.service";

@Injectable({
    providedIn: "root"
})
export class RegisterService {
    private loadingSubject = new BehaviorSubject<Boolean>(false);
    public loading: Observable<Boolean> = this.loadingSubject.asObservable();

    private statesSubject = new BehaviorSubject<[]>([]);
    public states: Observable<[]> = this.statesSubject.asObservable();

    private lgaSubject = new BehaviorSubject<String[]>([]);
    public lgas: Observable<String[]> = this.lgaSubject.asObservable();

    register(data: RegisterCredentials) {
        this.loadingSubject.next(true);
        this.http.post<RegisterResponse>("/users/sign_up", data).subscribe(
            resp => {
                if (resp.success) {
                    localStorage.setItem("TOKEN", resp.token);
                    this.loginService.setUser(resp);
                    this.router.navigate([""]);
                } else {
                    console.log(resp.message);
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

    getStates() {
        this.http
            .get<[]>("https://locationsng-api.herokuapp.com/api/v1/states")
            .subscribe(resp => {
                this.statesSubject.next(resp);
            });
    }

    getLGAs(state) {
        this.http
            .get<String[]>(
                `https://locationsng-api.herokuapp.com/api/v1/states/${state}/lgas`
            )
            .subscribe(resp => {
                this.lgaSubject.next(resp);
            });
    }

    constructor(
        private http: HttpService,
        private errorHandler: ErrorHandlerService,
        private router: Router,
        private loginService: LoginService
    ) {}
}
