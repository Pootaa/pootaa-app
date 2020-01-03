import { Injectable } from "@angular/core";
import { HttpService } from "../utils/apiService/http.service";
import { ErrorHandlerService } from "../utils/errors/error-handler.service";
import { StatesResponse } from "./register";
import { Observable, BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class RegisterService {
    private loadingSubject = new BehaviorSubject<Boolean>(false);
    public loading: Observable<Boolean> = this.loadingSubject.asObservable();

    private statesSubject = new BehaviorSubject<StatesResponse[]>([]);
    public states: Observable<
        StatesResponse[]
    > = this.statesSubject.asObservable();

    private lgaSubject = new BehaviorSubject<String[]>([]);
    public lgas: Observable<String[]> = this.lgaSubject.asObservable();

    getStates() {
        this.loadingSubject.next(true);
        this.http
            .get<StatesResponse[]>(
                "http://locationsng-api.herokuapp.com/api/v1/states"
            )
            .subscribe(resp => {
                this.statesSubject.next(resp);
                this.loadingSubject.next(false);
            });
    }

    getLGAs(state) {
        console.log(state);
        this.loadingSubject.next(true);
        this.http
            .get<String[]>(
                `http://locationsng-api.herokuapp.com/api/v1/states/${state}/lgas`
            )
            .subscribe(resp => {
                this.lgaSubject.next(resp);
                this.loadingSubject.next(false);
            });
    }

    constructor(
        private http: HttpService,
        private errorHandler: ErrorHandlerService
    ) {}
}
