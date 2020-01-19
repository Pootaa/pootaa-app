import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { BecomePootaaComponent } from "./become-pootaa/become-pootaa.component";
import { HireSuccessComponent } from "./hire-success/hire-success.component";
import { HirePootaaComponent } from "./hire-pootaa/hire-pootaa.component";
import { PackageListingsComponent } from "./package-listings/package-listings.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { LogoutComponent } from "./logout/logout.component";
import { AuthModuleService } from "./routerGuards/auth-module.service";
import { NoAuthService } from "./routerGuards/no-auth.service";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: "contact",
        component: ContactComponent
    },
    {
        path: "logout",
        component: LogoutComponent
    },
    {
        path: "auth",
        component: AuthLayoutComponent,
        children: [
            {
                path: "",
                redirectTo: "login",
                pathMatch: "full"
            },
            {
                path: "login",
                component: LoginComponent
            },
            {
                path: "register",
                component: RegisterComponent
            },
            {
                path: "become-a-pootaa",
                component: BecomePootaaComponent
            }
        ],
        canActivate: [NoAuthService]
    },
    {
        path: "hire-a-pootaa",
        component: HirePootaaComponent,
        canActivate: [AuthModuleService]
    },
    {
        path: "hire-success",
        component: HireSuccessComponent,
        canActivate: [AuthModuleService]
    },
    {
        path: "listings",
        component: PackageListingsComponent,
        canActivate: [AuthModuleService]
    },
    {
        path: "edit-profile",
        component: EditProfileComponent
    },
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full",
        component: HomeComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
