import {Component} from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isAuthenticated: boolean = true;

  // constructor(public oktaAuth: OktaAuthService) {
  //   this.oktaAuth.$authenticationState.subscribe(
  //     (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
  //   );
  // }
}
