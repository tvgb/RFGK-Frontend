import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule,
		MatCardModule,
		MatButtonModule,
		MatToolbarModule ,
		MatExpansionModule,
		MatTableModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSliderModule,
		MatProgressSpinnerModule,
		MatProgressBarModule} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { ScorecardListComponent } from './scorecard/scorecard-list/scorecard-list.component';
import { ScorecardService } from './scorecard/scorecard.service';
import { LayoutModule } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeNb from '@angular/common/locales/nb';
import { LoginComponent } from './login/login.component';
import { ScorecardCreateComponent } from './scorecard/scorecard-create/scorecard-create.component';
import { RoundCreateComponent } from './scorecard/round/round-create/round-create.component';
import { RoundListComponent } from './scorecard/round/round-list/round-list.component';
import { AuthenticationService } from './login/authentication.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AuthGuard } from './guards/auth.gard';
import { HoldableDirective } from './holdable.directive';

registerLocaleData(localeNb, 'nb');

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		TableComponent,
		ScorecardListComponent,
		ScorecardCreateComponent,
		LoginComponent,
		RoundCreateComponent,
		RoundListComponent,
		HoldableDirective
	],
	imports: [
		ReactiveFormsModule,
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatCardModule,
		MatButtonModule,
		MatToolbarModule,
		MatExpansionModule,
		HttpClientModule,
		MatTableModule,
		LayoutModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatMomentDateModule,
		MatSliderModule,
		MatProgressSpinnerModule,
		MatProgressBarModule
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'nb' },
		ScorecardService,
		DatePipe,
		AuthenticationService,
		AuthGuard,
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

	],
	bootstrap: [AppComponent]
})

export class AppModule { }
