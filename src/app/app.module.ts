import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { InicioComponent } from './inicio/inicio.component';


const appRoutes: Routes = [
  { path: 'app-dashboard', component: AppDashboardComponent },
  { path: 'inicio', component: InicioComponent },
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    AppDashboardComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
