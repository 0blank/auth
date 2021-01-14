import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
          // client-side error
          switch (error.status) {
            case 0:
              console.log("Server not Responding.");
              break;
            case 400:
              console.log("Sorry !!! Bad Request. Error Code 400");
              errorMessage = "Sorry !!! Bad Request. Error Code 400";
              break;
            case 401:
              console.log(
                "Sorry !!! You are Unauthorized to perform this action. Error Code 401"
              );
              errorMessage =
                "Sorry !!! You are Unauthorized to perform this action. Error Code 401";
              break;
            case 404:
              console.log("Sorry !!! 404 Not found");
              errorMessage = "Sorry !!! 404 Not found";
              break;
            case 500:
              console.log(
                "OOPS!! Something went wrong! Try again later. Error Code 500"
              );
              errorMessage =
                "OOPS!! Something went wrong! Try again later. Error Code 500";
              break;
            default:
              break;
          }
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}

