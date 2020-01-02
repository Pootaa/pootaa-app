import { Injectable } from "@angular/core";
import { ErrorHandler } from "./error-handler";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ErrorHandlerService {
    private errorSubject = new BehaviorSubject<ErrorHandler>(<ErrorHandler>{});
    public errors: Observable<ErrorHandler> = this.errorSubject.asObservable();

    constructor() {}
    setError(message: string, type: string) {
        const payload = {
            message,
            type
        };
        this.errorSubject.next(payload);
    }

    resetError() {
        this.errorSubject.next(<ErrorHandler>{});
    }
}
