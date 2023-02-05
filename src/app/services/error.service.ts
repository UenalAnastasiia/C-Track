import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    getClientMessage(error: Error) {
        return error;
    }

    getServerMessage(error: HttpErrorResponse): string {
        var msg = error.error.Message;
        if (!!msg)
            return msg + " : " + error.error.ExceptionMessage;
        return "API-Limit was exceeded, please reload the page or try again later.";
    }
}