import {Injectable} from '@angular/core';
import {BASE_URL, UserClaim, Response} from "./app.interfaces";
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  public signIn(email: string, password: string) {
    return this.http.post<Response>(`/api/auth/login`, {
        email: email,
        password: password
      },
      {
        withCredentials: true
      });
  }

  public signOut() {
    return this.http.get(`/api/auth/logout`);
  }

  public user() {
    return this.http.get<UserClaim[]>(`/api/auth/get-users`, {withCredentials: true});
  }

  public isSignedIn(): Observable<boolean> {
    return this.user().pipe(
      map((userClaims) => {
        return userClaims.length > 0;
      }),
      catchError((error) => {
        return of(false);
      }));
  }
}
