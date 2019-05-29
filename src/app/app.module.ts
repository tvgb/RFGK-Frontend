import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule,
		MatCardModule,
		MatButtonModule,
		MatToolbarModule ,
		MatExpansionModule,
		MatTableModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostService } from './posts/posts.service';
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

registerLocaleData(localeNb, 'nb');

@NgModule({
	declarations: [
		AppComponent,
		PostCreateComponent,
		HeaderComponent,
		PostListComponent,
		TableComponent,
		ScorecardListComponent,
		ScorecardCreateComponent,
		LoginComponent,
		RoundCreateComponent,
		RoundListComponent
	],
	imports: [
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
		MatListModule
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'nb' },
		PostService,
		ScorecardService,
		DatePipe,
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
