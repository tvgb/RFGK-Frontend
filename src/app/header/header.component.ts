import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../login/authentication.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

	showDropdown = false;
	isLoggedIn = false;
	private isLoggedInSub: Subscription;

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
		map(result => result.matches)
	);

  	constructor(private authService: AuthenticationService, private breakpointObserver: BreakpointObserver) { }

	ngOnInit() {
		if (this.authService.isTokenExpired()) {
			this.authService.logout();
			this.isLoggedIn = false;
		} else {
			this.isLoggedIn = true;
		}

		this.isLoggedInSub = this.authService.isLoggedInStatusUpdater()
		.subscribe((isLoggedIn: boolean) => {
			this.isLoggedIn = isLoggedIn;
		});
	}

	ngOnDestroy() {
		this.isLoggedInSub.unsubscribe();
	}

	logOut() {
		this.authService.logout();
	}

	toggleDropdown() {
		this.showDropdown = !this.showDropdown;
	}
}
