import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../register/register.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HirePootaaService } from "./hire-pootaa.service";
import { environment } from "../../environments/environment";
import { User } from '../login/login';
import { LoginService } from '../login/login.service';
import { HirePootaaRequest } from './hire-pootaa';

@Component({
    selector: "app-hire-pootaa",
    templateUrl: "./hire-pootaa.component.html",
    styleUrls: ["./hire-pootaa.component.scss"]
})
export class HirePootaaComponent implements OnInit {
    activeTab: number = 1;
    loading: Boolean = false;
    states: Object[];
    lgas: string[];
    user: User = <User>{}
    trackID: String
    imageLoading: boolean = false;
    imageError: boolean = false;
    items: object[] = [];
    hireForm: Object[] = [];
    formData1: FormGroup;
    formData2: FormGroup;
    formData3: FormGroup;
    formImage: any;

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
        if (this.formData1.valid) {
            this.hireForm.push(form);
            this.goToNextTab();
        }
        return true;
    }

    step2(form) {
        if (this.formData2.valid) {
            this.hireForm.push(form)
            const payload: HirePootaaRequest = <HirePootaaRequest>{}
            this.hireForm.forEach(el=>{
                Object.entries(el).forEach(([key, value])=>{
                    payload[key] = value
                })
            })
            this.loading = true
            this.hireService.hirePootaa(payload).subscribe(resp=> {
                this.loading = false
                this.trackID = resp
                this.goToNextTab()
            })
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

    submitUploads(){
        // const cost = this.items.reduce((acc,value)=>acc)
        let cost = 0;
        this.items.forEach(element => {
            cost += element.cost
        });
        if(this.items.length > 0){
            this.goToNextTab()
            this.makeTransaction(cost)
        }
    }


    makeTransaction(cost: number) {
        const handler = PaystackPop.setup({
            key: environment.paystackKey,
            email: this.user.email,
            amount: cost * 100,
            firstname: this.user.first_name,
            lastname: this.user.last_name,
            onClose: resp => {
                this.loading = false;
            },
            callback: response => {
                if (response.status === "success") {
                } else {
                }
            }
        });
        handler.openIframe();
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
        this.imageError = false
        this.hireService.uploadItemImage(formData).subscribe(
            resp => {
                this.formImage = resp;
                this.formData3.patchValue({image_url: resp})
            },
            err => {
                this.imageError = true;
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
        private hireService: HirePootaaService
    ) {}

    ngOnInit() {
        this.registerService.getStates();
        this.registerService.states.subscribe(resp => {
            this.states = resp;
        });
        this.registerService.lgas.subscribe(resp => {
            this.lgas = resp;
        });
        this.loginService.user.subscribe(resp=>{
            this.user = resp
        })
        const pick_up_add = new FormControl(null, Validators.required);
        const pick_up_country = new FormControl("Nigeria", Validators.required);
        const pick_up_state = new FormControl("", Validators.required);
        const pick_up_lga = new FormControl("", Validators.required);
        const pick_up_nearest_busstop = new FormControl(
            null,
            Validators.required
        );
        const pick_up_date = new FormControl(null, Validators.required);
        const pick_up_time = new FormControl(null, Validators.required);
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
        const recipient_date = new FormControl(null, Validators.required);
        const recipient_time = new FormControl(null, Validators.required);
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

        this.makeTransaction(100)
    }
}
