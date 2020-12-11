import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from './query-user.service';

@Injectable()
export class UserProcessorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (!(event.body instanceof Array)) {
            return event;
          }

          const body: any[] = event.body;
          const transformBody: User[] = body.map((item: any) => { 
            return {
              name: `${item.name} (${item.username})`,
              email: item.email,
              address: `${item.address.zipcode} ${item.address.city} ${item.address.street} ${item.address.suite}`,
              geo: item.address.geo
            };
          });
          event = event.clone({body: transformBody});
        }
        return event;
      })
    );
  }
}
