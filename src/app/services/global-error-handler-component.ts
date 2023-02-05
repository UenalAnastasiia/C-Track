import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';

    constructor(private injector: Injector, public snackBar: MatSnackBar) { }

    handleError(error: Error | HttpErrorResponse) {
        const errorService = this.injector.get(ErrorService);
        let message: any;

        if (error instanceof HttpErrorResponse) // Server Error 
        {
            message = errorService.getServerMessage(error);
            this.snackBar.open(message, 'X', {
                panelClass: ['error', 'snackbar-error'],
                verticalPosition: this.verticalPosition,
                horizontalPosition: this.horizontalPosition
            });
        } else // Client Error
            console.error(errorService.getClientMessage(error));
    }
}