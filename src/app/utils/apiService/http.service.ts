import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorHandlerService } from "../errors/error-handler.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class HttpService {
    baseURL: string = "https://poota-api.herokuapp.com/";
    constructor(
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) {}

    createAuthorizationHeader(headers: HttpHeaders) {
        this.errorHandler.resetError();
        const token = localStorage.getItem("TOKEN");
        if (token) headers.append("Authorization", "Bearer " + token);
    }

    post<T>(url, data): Observable<T> {
        let tempUrl = url;
        const headers = new HttpHeaders();
        if (url[0] === "/") {
            tempUrl = url.substr(1);
        }
        this.createAuthorizationHeader(headers);
        return this.http.post<T>(`${this.baseURL + tempUrl}`, data, {
            headers
        });
    }

    patch<T>(url, data): Observable<T> {
        let tempUrl = url;
        const headers = new HttpHeaders();
        if (url[0] === "/") {
            tempUrl = url.substr(1);
        }
        this.createAuthorizationHeader(headers);
        return this.http.patch<T>(`${this.baseURL + tempUrl}`, data, {
            headers
        });
    }

    get<T>(url, params): Observable<T> {
        let tempUrl = url;
        const headers = new HttpHeaders();
        if (url[0] === "/") {
            tempUrl = url.substr(1);
        }
        this.createAuthorizationHeader(headers);
        return this.http.get<T>(`${this.baseURL + tempUrl}`, { headers });
    }
}
