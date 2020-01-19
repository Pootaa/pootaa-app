import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../register/register.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HirePootaaService } from "./hire-pootaa.service";
import { environment } from "../../environments/environment";
import { User } from "../login/login";
import { LoginService } from "../login/login.service";
import { HirePootaaRequest, HirePootaaItems } from "./hire-pootaa";
import { ErrorHandlerService } from "../utils/errors/error-handler.service";
import { PaystackOptions } from "angular4-paystack";
import * as timePeriods from "../utils/timePeriods.json";

@Component({
    selector: "app-hire-pootaa",
    templateUrl: "./hire-pootaa.component.html",
    styleUrls: ["./hire-pootaa.component.scss"]
})
export class HirePootaaComponent implements OnInit {
    activeTab: number = 1;
    timeIntervals: string[] = (timePeriods as any).default;
    loading: boolean = false;
    states: object[];
    lgas: string[];
    user: User = <User>{};
    trackID: string;
    imageLoading: boolean = false;
    imageError: boolean = false;
    items: HirePootaaItems[] = [];
    hireForm: object[] = [];
    formData1: FormGroup;
    formData2: FormGroup;
    formData3: FormGroup;
    formImage: any;
    paymentText: string = "Complete Your Transaction";
    paymentCost: number;
    paymentRef: string;

    goToNextTab() {
        if (this.activeTab < 4) {
            this.activeTab += 1;
        }
    }
    goBack() {
        if (this.activeTab !== 1) {
            this.hireForm.pop();
            this.activeTab -= 1;
        }
    }

    step1(form) {
        this.errorHandler.resetError();
        if (this.formData1.valid) {
            this.hireForm.push(form);
            this.goToNextTab();
        }
        return true;
    }

    step2(form) {
        this.errorHandler.resetError();
        if (this.formData2.valid) {
            this.hireForm.push(form);
            const payload: HirePootaaRequest = <HirePootaaRequest>{};
            this.hireForm.forEach(el => {
                Object.entries(el).forEach(([key, value]) => {
                    if (key === "pick_up_date" || key === "recipient_date") {
                        payload[key] = value
                            .split("-")
                            .reverse()
                            .join("-");
                    } else {
                        payload[key] = value;
                    }
                });
            });
            this.loading = true;
            this.hireService.hirePootaa(payload).subscribe(
                resp => {
                    this.trackID = resp;
                    this.goToNextTab();
                },
                err => {
                    this.errorHandler.setError(
                        "Temporarily Unavailable. Try again later",
                        "hire"
                    );
                },
                () => {
                    this.loading = false;
                }
            );
        }
        return true;
    }

    step3(form) {
        if (this.formData3.valid) {
            this.items.push(form);
            this.formData3.reset();
            this.formImage = null;
        }
        // return true;
    }

    addNewItem(item) {
        this.items.push(item);
    }

    removeItem(index) {
        this.items.splice(index, 1);
    }

    submitUploads() {
        this.errorHandler.resetError();
        if (this.items.length > 0) {
            this.paymentCost = 0;
            this.paymentCost = this.items.reduce(
                (acc, item) => acc + item.cost,
                0
            );
            // this.items.forEach(element => {
            //     this.paymentCost += element.cost;
            // });
            this.loading = true;
            this.hireService.uploadItems(this.items).subscribe(
                resp => {
                    this.goToNextTab();
                    this.makeTransaction();
                },
                err => {
                    this.loading = false;
                    this.errorHandler.setError(
                        "Temporarily Unavailable. Try again later",
                        "hire"
                    );
                },
                () => {
                    this.loading = false;
                }
            );
        }
    }

    paymentInit() {
        // console.log("Payment initialized");
    }

    paymentDone(response: {
        reference: string;
        trans: string;
        status: string;
        message: string;
        transaction: string;
        trxref: string;
    }) {
        if (response.status === "success") {
            const payload = {
                track_id: this.trackID || "P484234829",
                payment_option: "online",
                reference: response.reference
            };
            this.hireService.makePayment(payload).subscribe(
                resp => {
                    if (resp.success) {
                        this.paymentText = resp.message;
                    } else {
                        this.paymentText =
                            "There was an error completing your payment. Please contact help@pootaa.ng";
                    }
                },
                err => {
                    this.loading = false;
                    this.paymentText =
                        "There was an error completing your payment. Please contact support@pootaa.ng";
                    this.errorHandler.setError(
                        "Temporarily Unavailable. Try again later",
                        "hire"
                    );
                },
                () => {
                    this.loading = false;
                }
            );
        } else {
            this.paymentText =
                "There was an error completing your payment. Please contact support@pootaa.ng";
            this.errorHandler.setError(
                "Temporarily Unavailable. Try again later",
                "hire"
            );
            this.loading = false;
        }
    }

    paymentCancel() {
        this.loading = false;
    }

    makeTransaction() {
        this.loading = true;
        this.paymentText = "Processing Payment...";
        const btn = document.getElementById("paystackBtn");
        btn.click();
    }

    uploadImage(e) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.formImage = reader.result;
        };
        const formData = new FormData();
        formData.append("file", file);
        this.imageLoading = true;
        this.imageError = false;
        this.hireService.uploadItemImage(formData).subscribe(
            resp => {
                this.formImage = resp.secure_url;
                this.formData3.patchValue({ image_url: resp.secure_url });
            },
            err => {
                this.formImage = null;
                this.imageError = true;
                this.imageLoading = false;
                e.target.value = "";
            },
            () => {
                this.imageLoading = false;
            }
        );
    }

    selectLGA(event) {
        this.lgas = [];
        const state = event.target.value;
        this.registerService.getLGAs(state.toLowerCase());
    }

    constructor(
        private loginService: LoginService,
        private registerService: RegisterService,
        private hireService: HirePootaaService,
        private errorHandler: ErrorHandlerService
    ) {}

    ngOnInit() {
        const today = new Date().toISOString().substring(0, 10);
        this.registerService.getStates();
        this.registerService.states.subscribe(resp => {
            this.states = resp;
        });
        this.registerService.lgas.subscribe(resp => {
            this.lgas = resp;
        });
        this.loginService.user.subscribe(resp => {
            this.user = resp;
        });
        const pick_up_add = new FormControl(null, Validators.required);
        const pick_up_country = new FormControl("Nigeria", Validators.required);
        const pick_up_state = new FormControl("", Validators.required);
        const pick_up_lga = new FormControl("", Validators.required);
        const pick_up_nearest_busstop = new FormControl(
            null,
            Validators.required
        );
        const pick_up_date = new FormControl(today, Validators.required);
        const pick_up_time = new FormControl("", Validators.required);
        const phone = new FormControl(null, Validators.required);
        this.formData1 = new FormGroup({
            pick_up_add,
            pick_up_country,
            pick_up_state,
            pick_up_lga,
            pick_up_nearest_busstop,
            pick_up_date,
            pick_up_time,
            phone
        });

        const delivery_state = new FormControl("", Validators.required);
        const delivery_country = new FormControl(
            "Nigeria",
            Validators.required
        );
        const delivery_lga = new FormControl("", Validators.required);
        const delivery_address = new FormControl("", Validators.required);
        const delivery_busstop = new FormControl(null, Validators.required);
        const recipient_name = new FormControl(null, Validators.required);
        const recipient_phone = new FormControl(null, Validators.required);
        const recipient_date = new FormControl(today, Validators.required);
        const recipient_time = new FormControl("", Validators.required);
        this.formData2 = new FormGroup({
            delivery_address,
            delivery_busstop,
            delivery_country,
            delivery_lga,
            delivery_state,
            recipient_date,
            recipient_name,
            recipient_phone,
            recipient_time
        });

        const item = new FormControl(null, Validators.required);
        const quantity = new FormControl(null, Validators.required);
        const cost = new FormControl(null, Validators.required);
        const instructions = new FormControl(null, Validators.required);
        const image_url = new FormControl(null, Validators.required);
        this.formData3 = new FormGroup({
            item,
            quantity,
            cost,
            instructions,
            image_url
        });
        this.generateRef();
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateRef() {
        const timestamp = +new Date();
        const letters = Math.random()
            .toString(36)
            .substr(2, 9)
            .toUpperCase();
        var ts = timestamp.toString();
        var parts = ts.split("").reverse();
        var id = "";

        for (var i = 0; i < 8; ++i) {
            var index = this.randomInt(0, parts.length - 1);
            id += parts[index];
        }
        this.paymentRef = letters + id;
    }
}
