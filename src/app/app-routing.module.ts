import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScorecardListComponent } from './scorecard/scorecard-list/scorecard-list.component';
import { LoginComponent } from './login/login.component';
import { ScorecardCreateComponent } from './scorecard/scorecard-create/scorecard-create.component';
import { AuthGuard } from './guards/auth.gard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{
		path: '', redirectTo: '/rounds', pathMatch: 'full'
	}, {
   		path: 'rounds', component: ScorecardListComponent
	}, {
		path: 'login', component: LoginComponent
	}, {
		path: 'create-scorecard', component: ScorecardCreateComponent, canActivate: [AuthGuard]
	}, {
		path: 'register', component: RegisterComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
