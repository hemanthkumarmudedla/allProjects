import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, PopupRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  title = 'login';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private broadcastService: MsalBroadcastService, private msalService: MsalService, private router: Router) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.redirect();
      })
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.msalService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe({
          next: (result) => {
            this.redirect();
          },
          error: (error) => {
            console.log(error)
          }
        });
    } else {
      this.msalService.loginPopup()
        .subscribe({
          next: (result) => {
            this.redirect();
          },
          error: (error) => {
            console.log(error)
          }
        });
    }
  }

  redirect() {
    let account = this.msalService.instance.getAllAccounts().shift()
    if (account != null)
      this.msalService.instance.setActiveAccount(account)
    this.router.navigate(["/home"])
  }

  ngOnDestroy(): void {
    // this._destroying$.next(undefined);
    // this._destroying$.complete();
  }
}
