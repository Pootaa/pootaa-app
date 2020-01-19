import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "../utils/apiService/http.service";
import {
    HirePootaaRequest,
    HirePootaaResponse,
    UploadImageResponse,
    HirePootaaItems,MakePaymentRequest, MakePaymentResponse
} from "./hire-pootaa";
import { ErrorHandlerService } from "../utils/errors/error-handler.service";

@Injectable({
    providedIn: "root"
})
export class HirePootaaService {
    private cloudName: string = "dn8hm8h6v";
    private uploadPreset: string = "vydi5ax1";
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading: Observable<boolean> = this.loadingSubject.asObservable();

    hirePootaa(data: HirePootaaRequest): Observable<string> {
        return this.http
            .post<HirePootaaResponse>("/users/pootaa/hire", data)
            .pipe(
                map(resp => {
                    if (resp.success) {
                        return resp.track_id;
                    } else {
                        this.errorHandler.setError(resp.message, "hire");
                    }
                })
            );
    }

    uploadItems(data: HirePootaaItems[]): Observable<string> {
        return this.http
            .post<HirePootaaResponse>("/users/items", data)
            .pipe(
                map(resp => {
                    if (resp.success) {
                        return resp.track_id;
                    } else {
                        this.errorHandler.setError(resp.message, "hire");
                    }
                })
            );
    }

    uploadItemImage(data: FormData): Observable<{secure_url: string}> {
        const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
        data.append("upload_preset", this.uploadPreset);
        data.append("folder", "pootaa");
        return this.http.post<UploadImageResponse>(url, data).pipe(
            map(resp => resp)
        );
    }

    makePayment(data: MakePaymentRequest): Observable<MakePaymentResponse>{

        return this.http
            .post<MakePaymentResponse>("/users/payment", data)
            .pipe(
                map(resp => {
                        return resp;
                })
            );
    }

    constructor(
        private http: HttpService,
        private errorHandler: ErrorHandlerService
    ) {}
}
