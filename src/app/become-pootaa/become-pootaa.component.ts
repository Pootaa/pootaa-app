import { Component, OnInit } from "@angular/core";
import { AuthTextService } from "../auth-text.service";
import { RegisterService } from "../register/register.service";
import * as allBanks from "../utils/banks.json";
import { ErrorHandlerService } from "../utils/errors/error-handler.service";
import { LoginService } from "../login/login.service";

@Component({
    selector: "app-become-pootaa",
    templateUrl: "./become-pootaa.component.html",
    styleUrls: ["./become-pootaa.component.scss"]
})
export class BecomePootaaComponent implements OnInit {
    states: [];
    lgas: string[];
    banks: [] = (allBanks as any).default;
    loading: boolean;
    errorType: string;
    passwordError: boolean;
    photoUploadError: boolean = false;
    idUploadError: boolean = false;
    photoUploadFile;
    idUploadFile;
    formData: FormData = new FormData();

    selectLGA(event) {
        this.lgas = [];
        const state = event.target.value;
        this.registerService.getLGAs(state.toLowerCase());
    }

    register(form) {
        this.passwordError = false;
        if (!this.photoUploadFile) {
            this.photoUploadError = true;
        }
        if (!this.idUploadFile) {
            this.idUploadError = true;
        }
        if (
            form.status === "VALID" &&
            this.idUploadFile &&
            this.photoUploadFile
        ) {
            if (form.value.password !== form.value.confirmPassword) {
                this.passwordError = true;
                return false;
            }
            this.formData.append("image", this.photoUploadFile);
            this.formData.append("image", this.idUploadFile);
            const { confirmPassword, ...payload } = form.value;
            Object.entries(<object>payload).forEach(([key, value]) => {
                this.formData.append(key, value);
            });
            this.loginService.registerAsAgent(this.formData);
        }
        return true;
    }

    photoUpload(e) {
        this.photoUploadError = false;
        const file = e.target.files[0];
        if (file.size <= 5 * 1024 * 1024) {
            this.photoUploadFile = file;
            this.toBase64(file, "photo");
        } else {
            this.photoUploadError = true;
        }
    }

    idUpload(e) {
        this.idUploadError = false;
        const file = e.target.files[0];
        if (file.size <= 5 * 1024 * 1024) {
            this.idUploadFile = file;
            this.toBase64(file, "id");
        } else {
            this.idUploadError = true;
        }
    }

    removePhoto() {
        this.photoUploadFile = null;
    }

    removeID() {
        this.idUploadFile = null;
    }

    toBase64(file, type) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (type === "id") {
                this.idUploadFile = reader.result;
            } else {
                this.photoUploadFile = reader.result;
            }
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }

    constructor(
        private titleService: AuthTextService,
        private registerService: RegisterService,
        private loginService: LoginService,
        private errorHandler: ErrorHandlerService
    ) {}

    ngOnInit() {
        this.registerService.getStates();
        this.titleService.setAuthTitle([
            "Become a Pootaa",
            "To become a porter, we will require a few details from you!"
        ]);
        this.loginService.loading.subscribe(resp => {
            this.loading = resp;
        });
        this.registerService.states.subscribe(resp => {
            this.states = resp;
        });
        this.registerService.lgas.subscribe(resp => {
            this.lgas = resp;
        });
        this.errorHandler.errors.subscribe(resp => {
            this.errorType = resp.type;
        });
    }
}
