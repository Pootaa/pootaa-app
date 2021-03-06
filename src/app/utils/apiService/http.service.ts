import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorHandlerService } from "../errors/error-handler.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class HttpService {
    baseURL: string = "https://poota-api.herokuapp.com/";
    private headers: HttpHeaders
    constructor(
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) {}

    createAuthorizationHeader(headers: HttpHeaders) {
        this.headers = new HttpHeaders()
        this.errorHandler.resetError();
        const token = localStorage.getItem("TOKEN");
        if (token) this.headers = this.headers.append("Authorization", "Bearer " + token);
    }

    post<T>(url, data): Observable<T> {
        let tempUrl = url;
        const headers = new HttpHeaders();
        if (url.startsWith("http")) {
            tempUrl = url;
        } else if (url[0] === "/") {
            tempUrl = this.baseURL + url.substr(1);
        }
        this.createAuthorizationHeader(headers);
        return this.http.post<T>(tempUrl, data, {
            headers: this.headers
        });
    }

    patch<T>(url, data): Observable<T> {
        let tempUrl = url;
        const headers = new HttpHeaders();
        if (url.startsWith("http")) {
            tempUrl = url;
        } else if (url[0] === "/") {
            tempUrl = this.baseURL + url.substr(1);
        }
        this.createAuthorizationHeader(headers);
        return this.http.patch<T>(tempUrl, data, {
            headers: this.headers
        });
    }

    get<T>(url): Observable<T> {
        let tempUrl = url;
        const headers = new HttpHeaders();
        if (url.startsWith("http")) {
            tempUrl = url;
        } else if (url[0] === "/") {
            tempUrl = this.baseURL + url.substr(1);
        }
        this.createAuthorizationHeader(headers);
        return this.http.get<T>(tempUrl, { 
            headers: this.headers });
    }
}
