import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "../utils/apiService/http.service";
import {
    HirePootaaRequest,
    HirePootaaResponse,
    UploadImageResponse
} from "./hire-pootaa";
import { ErrorHandlerService } from "../utils/errors/error-handler.service";

@Injectable({
    providedIn: "root"
})
export class HirePootaaService {
    private cloudName: string = "dn8hm8h6v";
    private uploadPreset: string = "vydi5ax1";
    private loadingSubject = new BehaviorSubject<Boolean>(false);
    public loading: Observable<Boolean> = this.loadingSubject.asObservable();

    private uploadProgressSubject = new BehaviorSubject<number>(0);
    public uploadProgress: Observable<
        number
    > = this.uploadProgressSubject.asObservable();

    hirePootaa(data: HirePootaaRequest): Observable<string> {
        this.loadingSubject.next(true);
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
        // .subscribe(
        //     resp => {
        //         if (resp.success) {
        //             return resp.track_id;
        //         } else {
        //             this.errorHandler.setError(resp.message, "hire");
        //         }
        //     },
        //     err => {
        //         this.errorHandler.setError(
        //             "Temporarily Unavailable. Try again later",
        //             "hire"
        //         );
        //     },
        //     () => {
        //         this.loadingSubject.next(false);
        //     }
        // );
    }

    uploadItemImage(data: FormData): Observable<string> {
        const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;

        // Reset the upload progress bar
        //  document.getElementById('progress').style.width = 0;
        // this.uploadProgressSubject.next(0);

        // Update progress (can be used to show progress indicator)
        //     xhr.upload.addEventListener("progress", function(e) {
        //         var progress = Math.round((e.loaded * 100.0) / e.total);
        //         document.getElementById("progress").style.width = progress + "%";

        //         console.log(`fileuploadprogress data.loaded: ${e.loaded},
        // data.total: ${e.total}`);
        //     });
        data.append("upload_preset", this.uploadPreset);
        data.append("folder", "pootaa");
        return this.http.post<UploadImageResponse>(url, data).pipe(
            map(resp => {
                return resp.secure_url;
            })
        );
        // .subscribe(resp => {
        //     return resp.secure_url;
        // });
    }

    constructor(
        private http: HttpService,
        private errorHandler: ErrorHandlerService
    ) {}
}
