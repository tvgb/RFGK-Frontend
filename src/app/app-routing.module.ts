import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScorecardListComponent } from './scorecard/scorecard-list/scorecard-list.component';
import { LoginComponent } from './login/login.component';
import { ScorecardCreateComponent } from './scorecard/scorecard-create/scorecard-create.component';
import { AuthGuard } from './guards/auth.gard';

const routes: Routes = [
	{
		path: '', redirectTo: '/rounds', pathMatch: 'full'
	}, {
   		path: 'rounds', component: ScorecardListComponent
	}, {
		path: 'login', component: LoginComponent
	}, {
		path: 'create-scorecard', component: ScorecardCreateComponent, canActivate: [AuthGuard]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
