import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { TokenStorageService } from "../services/token-storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private _tokenStorageService: TokenStorageService,
        private _router: Router,
        ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this._tokenStorageService.getToken()}`
            }
        });
        return next.handle(request).pipe(
            catchError(
                (error) => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401) {
                            this._router.navigate(['/login']);
                        }
                    }
                    return throwError(error);
                }
            )
        )
    }
}
