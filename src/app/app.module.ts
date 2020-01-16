import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { AboutComponent } from "./about/about.component";
import { CitiesComponent } from "./cities/cities.component";
import { ContactComponent } from "./contact/contact.component";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { BecomePootaaComponent } from "./become-pootaa/become-pootaa.component";
import { HireSuccessComponent } from "./hire-success/hire-success.component";
import { HirePootaaComponent } from "./hire-pootaa/hire-pootaa.component";
import { HeaderComponent } from "./header/header.component";
import { HeaderLayoutComponent } from "./header-layout/header-layout.component";
import { PackageCardsComponent } from "./package-cards/package-cards.component";
import { PackageListingsComponent } from "./package-listings/package-listings.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ErrorBlockComponent } from "./error-block/error-block.component";
import { LogoutComponent } from "./logout/logout.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        AboutComponent,
        CitiesComponent,
        ContactComponent,
        AuthLayoutComponent,
        RegisterComponent,
        LoginComponent,
        BecomePootaaComponent,
        HireSuccessComponent,
        HirePootaaComponent,
        HeaderComponent,
        HeaderLayoutComponent,
        PackageCardsComponent,
        PackageListingsComponent,
        EditProfileComponent,
        ErrorBlockComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
