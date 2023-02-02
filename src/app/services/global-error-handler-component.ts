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
        let message;
        let stackTrace = errorService.getClientStack(error);

        if (error instanceof HttpErrorResponse) // Server Error
            message = errorService.getServerMessage(error);
        else // Client Error
            message = errorService.getClientMessage(error);

        this.snackBar.open(message, 'X', { 
            panelClass: ['error'],
            verticalPosition: this.verticalPosition,
            horizontalPosition: this.horizontalPosition 
        });
    }
}